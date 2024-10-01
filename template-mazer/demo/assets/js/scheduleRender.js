"use strict";
const $ = jQuery;
let scheduleOperatory = document.getElementById('schedule-operatory');
let scheduleTable = document.getElementById('table-schedule-time');
let timelineTable = document.getElementById('table-timeline');
let scheduleCont = document.getElementById('schedule-overflow');
let currentView = document.getElementById('current-time');
let eventStore = document.getElementById('event-store');

window.onload = function () {
	loadSchedule();
}

export const AppointmentJS = {
	instance: null,
}

export function Init() {
	//handleRemoveSsAllEvent();
	//viewDetail();
}

function LoadData(date, callbackSuccess) {
	$.ajax({
		type: "POST",
		url: "../assets/json/datajson.txt",
		data: '{date:"' + date + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data) {
			if (data.length > 0) {
				callbackSuccess(data);
			}
		},
		error: function () {
			alert(500);
		}
	});

	/*var d = AppointmentJS.instance.invokeMethodAsync("LoadData").then(result => {
		callbackSuccess(result);
	});*/

};

export function loadSchedule(date, instances) {
	AppointmentJS.instance = instances;
	//console.log(AppointmentJS.instance);

	$(timelineTable).html('');
	$(scheduleTable).html('');
	//24h loop
	for (let i = 8; i <= 23; i++) {
		let suffix = i < 12 ? 'am' : 'pm';
		let time = i;
		if (i > 12) {
			time = i - 12
		}
		let data_hours = i;
		$(timelineTable).append(`
            <tr><td class="time"><p class="big-time">${time} <span>${suffix}</span></p><p class="lb-minutes top">15</p><p class="lb-minutes center">30</p><p class="lb-minutes bottom">45</p></td></tr>`);

		$(scheduleTable).append(`
            <tr data-date-time="${data_hours}:00" class="time-minute-rezo">${cellsOperationRender()}</tr>           
            <tr data-date-time="${data_hours}:15">${cellsOperationRender()}</tr>          
            <tr data-date-time="${data_hours}:30">${cellsOperationRender()}</tr>          
            <tr data-date-time="${data_hours}:45">${cellsOperationRender()}</tr>         
            ${data_hours == 23 ? '<tr data-date-time="24:00"></tr>' : ''}`
		);
	}
	//nhanvien event store
	$(eventStore).find('tr').html('<td class="axisX" style="width: 100px;"></td>');
	$(eventStore).find('tr').append(`${cellsOperationRender(`<div class="events-mirror"></div><div class="events"></div>`)}`);
	$(scheduleCont).parent('td').attr("colspan", scheduleOperatory.rows[0].cells.length);

	LoadData(date, function (data) {
		data.forEach(item => {
			try {
				let tdIndex = document.getElementById(item.idStaff).cellIndex;
				if (item.type != "Extra") {
					addCustomer(
						item.starttime,
						item.endtime,
						item.tierTimeEnd,
						item.starttimemin,
						item.endtimemin,
						tdIndex,
						{
							id: item.id,
							color: item.color,
							mess: item.mess,
							cCount: item.cCount,
							isProcess: item.isProcess,
							isNew: item.isNew,
							SbID: item.sesionBookID,
							sTT: item.stt,
							cUstomerName: item.customerName,
							svName: item.svName,
							date: item.date,
							datenow: item.dateNow,
							draggable: item.draggable,
							statusservice: item.statusservice,
							BookingNoTurn: item.bookingNoTurn,
							Customerphone: item.customerphone,
							Note: item.note2,
							StatusSMS: item.statusSMS,
							SelectStaff: item.selectStaff,
							bkOnline: item.bookOnline,
							status_deposit: item.status_deposit,
							classCus: [
								item.cus,
								item.paid,
								item.booking,
								item.free,
								item.sv,
								item.type,
								item.finish,
								item.parallel
							],
							discountId: item.discountId,
							discountName: item.discountName,
						});
				} else {
					addBlankTime(item.starttime, item.endtime, tdIndex, item.id, item.dateNow, item.note);
				}
			} catch (err) {

			}
			//handleRemoveSsAllEvent();
			//viewDetail();
		});
		document.querySelectorAll('.ev-draggable').forEach(function (ele, index) {
			draggSch(ele, function (t, element) {
				console.log(t);
				var sbsID = $(element).find('input.idE').val();
				var a = $(element).find('input.idE').closest('td');
				//AppointmentJS.instance.invokeMethodAsync("UpdateMoveService", { HHmm: t, SessionDetailID: Number(sbsID), UserID: Number(a.attr('data-id')) })
			});
		});
		//AppointmentJS.instance.invokeMethodAsync("HideLoading");
	});
	// fixed left col
	$("#schedule-overflow-horizontal").on("scroll", function (e) {
		let horizontal = e.currentTarget.scrollLeft;
		let vertical = e.currentTarget.scrollTop;
		timelineTable.style.left = (horizontal - 1) + 'px';
	});
	//recall call function
	currentView.style.top = positionYByTime() + 'px';
	scheduleCont.scrollTop = currentView.offsetTop - scheduleCont.clientHeight / 2;

	var xInterval = setInterval(function () {
		currentView.style.top = rePositionYByTime() + 'px';
		checkOvertimeEvent();
		$('.sch-event').each(function (index, ele) {
			let posYt = ele.offsetTop;


			if (posYt < positionYByTime()) {
				$(ele).addClass('testdd');
			} else {
			}
		});
	}, 5000);

}

//Schedule functions
function checkOvertimeEvent() {
	$('.sch-event').each(function (index, ele) {
		checkOvertimeSingle(ele);
	});
}

function checkOvertimeSingle(ele) {
	let posYt = ele.offsetTop;
	let posYb = $(ele).innerHeight() + ele.offsetTop;

	var dt = new Date();
	var time = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
	var s = $('#ContentPlaceHolder1_datee').text();

	var sm = new Date(time);
	var sn = new Date(s);

	if (sm.getDate() == sn.getDate()) {
		if (posYt < positionYByTime() && $(ele).hasClass('booking')) {
			var bd = $(ele).find('.ev-body');
			bd.removeAttr("style");
			console.log('Bnails DEV');
			$(ele).addClass('overtime');
		} else {
			$(ele).removeClass('overtime');
		}
	}
}

function cellsOperationRender(str = '') {
	var result = [];
	for (let i = 1; i < scheduleOperatory.rows[0].cells.length; i++) {
		let cell = scheduleOperatory.rows[0].cells[i];
		result.push(`<td data-type="${cell.getAttribute('data-type')}" class="${cell.className}" data-id="${cell.id}">${str}</td>`);
	}
	return result;
}

function OtherEvent(ele) {
	var myCl = $(ele).attr('class').split(' ').filter(myClass => {
		let mystring = myClass,
			expr = /cus-/;
		return expr.test(mystring);
	});
	var result = [];
	$(`.${myCl[0]}`).each(function () {
		if (ele == this) {

		} else {
			result.push(this);
		}
	});
	return result;
}

function inColEvent(ele) {
	var result = [];
	$(ele).closest('.events').find('.sch-event').each(function () {
		if (ele == this) {

		} else {
			result.push(this);
		}
	});


	return result;
};
//var timezone = -6;
var userTime = new Date();
var svTime = new Date(userTime.getTime() + userTime.getTimezoneOffset() * 60000 + timezone * 60 * 60 * 1000);

function positionYByTime(time = svTime) {
	let divH = scheduleTable.clientHeight;
	let rowH = 155;
	let hour = time.getHours() - 8;
	let minute = time.getMinutes() + 1;
	return hour / 16 * divH + minute / 60 * rowH;
};

function rePositionYByTime(stime = new Date()) {
	var reSvTime = new Date(stime.getTime() + stime.getTimezoneOffset() * 60000 + timezone * 60 * 60 * 1000);
	var time = reSvTime;
	let divH = scheduleTable.clientHeight;
	let rowH = 155;
	let hour = time.getHours() - 8;
	let minute = time.getMinutes() + 1;
	return hour / 16 * divH + minute / 60 * rowH;
};

function timeByPositionY(pos) {
	let divH = scheduleTable.clientHeight;
	let rawTime = pos / divH * 16;
	let ratioM = rawTime - parseInt(rawTime);
	let hours = parseInt(rawTime);
	let minutes = 0;
	if (ratioM > 0) {
		minutes = ratioM * 60;
	}
	//dinh dang lai truong hop 2k

	var m = Math.round(minutes);
	if (0 < m && m < 15) {
		m = 15;
	}
	if (15 < m && m < 30) {
		m = 30;
	}
	if (30 < m && m < 45) {
		m = 45;
	}
	if (45 < m && m <= 59) {
		hours += 1;
		m = 0;
	}
	return `${hours + 8}:${m == 0 ? '00' : Math.round(m)}`;
};

function addCustomer(timeStar = "", timeEnd = "", tierTimeEnd = "", timeStarMin = "", timeEndMin = "", operatory = 0, opt = {
	id: 0,
	color: '#c0c0c0',
	isNew: false,
	isProcess: false,
	mess: false,
	cCount: 0,
	SbID: 0,
	sTT: 0,
	cUstomerName: '',
	Customerphone: '',
	svName: '',
	date: '',
	datenow: false,
	draggable: '',
	extra: 0,
	statusservice: '',
	BookingNoTurn: '',
	Note: false,
	StatusSMS: 0,
	SelectStaff: '',
	bkOnline: '',
	status_deposit: 0,
	classCus: [''],
	discountId: 0,
	discountName: ''
}) {
	try {
		let contCell = $(eventStore).find('td:not(.time)').eq(operatory);
		let contEle = contCell.children('.events');
		let tier = parseInt(contCell.data('type'));

		let hoursS = (timeStar.split(':')[0]);
		let minutesS = (timeStar.split(':')[1]);
		let topPosY = $(scheduleTable).find(`tr[data-date-time="${hoursS}:${minutesS == '00' ? '00' : minutesS}"]`)[0].offsetTop;

		let hoursE = (tierTimeEnd.split(':')[0]);
		let minutesE = (tierTimeEnd.split(':')[1]);
		let bottomPosY = $(scheduleTable).find(`tr[data-date-time="${hoursE}:${minutesE == '00' ? '00' : minutesE}"]`)[0].offsetTop;

		let ipStoreTime = `<input type="hidden" class="timeB" value="${timeStar}">
        <input type="hidden" class="timeE" value="${timeEnd}">
        <input type="hidden" class="timeBM" value="${timeStarMin}">
        <input type="hidden" class="timeEM" value="${timeEndMin}">`;

		let eleTempalte = $(`<div class="sch-event ${opt.draggable} ${opt.isProcess ? 'process' : ''} ${opt.classCus.map(cl => `${String(cl)}`).join(' ')}" style="top:${topPosY}px;height:${bottomPosY - topPosY}px">
        <div class="ev-top">
            <i class="${opt.bkOnline}" title="Booking online" style="float:right; padding-right: 2px; color: red;"></i>
            <i class="${opt.SelectStaff}" title="Choose staff"></i>           
            <p><strong styke="padding-right: 4px;">${opt.sTT}</strong><a href="javascript:;" title="Important info" class="${opt.Note ? 'bi bi-info-circle' : ''}" onclick=LoadNoteCustomer('${opt.Customerphone}')></a>  <span title="${opt.Customerphone}">${opt.cUstomerName}</span> </p>
            <div>${opt.BookingNoTurn}</div>        
        </div>
        ${opt.statusservice}
        <div class="ev-body" style="background: ${opt.color}">
            ${opt.svName} 
        </div>
        <div class="lbs">
            ${opt.isNew ? '<span class="lb new">New</span>' : ''}
            ${opt.cCount > 0 ? '<span class="lb new" title="No show"><i class="bi-slash-circle"></i> ' + opt.cCount + '</span>' : ''}
            ${opt.mess ? '<span class="lb parallel"  title="Service Parallel"> // </span>' : ''}
            ${opt.extra > 0 ? '<span class="lb">Ex+' + opt.extra + '</span>' : ''}
            ${opt.discountId > 0 ? '<br/><span class="lb"><i class="bi bi-gift" style="top: -1px;"></i> Discount: ' + opt.discountName + '</span>' : ''}
            ${opt.status_deposit == 1 ? '<span class="lb parallel" title="Deposit"><i class="bi bi-currency-dollar"></i></span>' : opt.status_deposit == 2 ? '<span class="lb" title="Deposit"><i class="bi bi-currency-dollar"></i></span>' : ''}           
        </div>        
        <div class="actions">
            <span class="tmp-time-top"></span>            
            <a href="#popup-change-time" data-bs-toggle="modal" title="Change time" class="${opt.datenow ? 'bi bi-arrows-vertical' : ''} change-time" data-service="${opt.id}"></a>           
            <a href="javascript:;" title="Reset services" class="${opt.datenow ? 'bi bi-arrow-repeat reset-service' : ''}" data-service="${opt.id}"></a>
            <a href="#popup-change-session" title="Change session" data-bs-toggle="modal" class="${opt.datenow ? 'bi bi-arrows change-session' : ''}" data-service="${opt.id}"></a>
            <a href="javascript:;" title="Delete session (No Show)" class="${opt.datenow ? 'bi bi-slash-circle delete-session' : ''}" data-session="${opt.SbID}" data-status="4"></a>
            <a href="javascript:;" title="Delete session" class="${opt.datenow ? 'bi bi-trash3 delete-session' : ''}" data-session="${opt.SbID}" data-status="5"></a>
            <a href="javascript:;" title="Delete service" class="${opt.datenow ? 'bi bi-x-lg delete-service' : ''}" data-service="${opt.id}"></a>
            <a title="Session detail" href="#popupBooking" data-bs-toggle="modal" class="bi bi-gear view-detail" data-session="${opt.SbID}"></a>
        </div>
               
        ${opt.isProcess ? '<span class="process"></span>' : ''}

        ${opt.StatusSMS == 1 ? `<a href="javascript:;" class="power-off enable-booking handleRemoveSsAllEvent" data-status="booking" data-sbs="${opt.SbID}" title="Check in client" ><i class="bi bi-power"></i></a>` : ''}
        ${opt.StatusSMS == 2 ? `<a href="javascript:;" class="power-off enable-booking handleRemoveSsAllEvent" data-status="booking" data-sbs="${opt.SbID}" title="Check in client" ><i class="bi bi-power"></i></a>` : ''}
        ${opt.StatusSMS == 3 ? `<a href="javascript:;" class="power-off enable-booking handleRemoveSsAllEvent" data-status="booking" data-sbs="${opt.SbID}" title="Check in client" ><i class="bi bi-power"></i></a>` : ''}
        ${opt.StatusSMS == 4 ? `<a href="javascript:;" class="power-off enable-booking handleRemoveSsAllEvent" data-status="booking" data-sbs="${opt.SbID}" title="Check in client" ><i class="bi bi-power"></i></a>` : ''}

        ${ipStoreTime}
        ${opt.id != '0' ? `<input type="hidden" class="idE" value="${opt.id}">` : ``}
        </div>`);

		if (bottomPosY - topPosY == 0) return;
		contEle.append(eleTempalte);
		$('[data-tooltip="tooltip"]').tooltip({
			container: 'body'
		});
		return eleTempalte;
	} catch (err) {
		console.log(err.message);
	}
}

function addBlankTime(timeStar = '', timeEnd = '', operatory = 0, ID = 0, datenow = false, note = "") {
	let contCell = $(eventStore).find('td:not(.time)').eq(operatory);
	let contEle = contCell.children('.events');

	let hoursS = (timeStar.split(':')[0]);
	let minutesS = (timeStar.split(':')[1]);
	let topPosY = $(scheduleTable).find(`tr[data-date-time="${hoursS}:${minutesS == 0 ? '00' : minutesS}"]`)[0].offsetTop;

	let hoursE = (timeEnd.split(':')[0]);
	let minutesE = (timeEnd.split(':')[1]);
	let bottomPosY = $(scheduleTable).find(`tr[data-date-time="${hoursE}:${minutesE == 0 ? '00' : minutesE}"]`)[0].offsetTop;

	let eleTempalte = `
    <div class="sch-event ev-blank" style="top:${topPosY}px;height:${bottomPosY - topPosY}px">
        <div class="ev-body" style="background: ${'#000'};">
            <div class="actions">
            ${note}
            <span class="lb"></span>
            <a href="javascript:;" title="Delete break time" class="${datenow ? 'bi bi-x-lg delete-service' : ''}" data-service="${ID}"></a>
        </div>
        <input type="hidden" class="idE" value="${ID}"></div>
    </div>
    `;
	contEle.append(eleTempalte);
}

function draggSch(obj, callbackStopDragg) {
	let w = $('#table-schedule-time td:not(.time)').innerWidth() + 3;
	let h = $('#table-schedule-time td:not(.time)').innerHeight();
	let topStamp = 0;
	try {
		$(obj).draggable(
			/*{
			scroll: true,
			containment: "#table-schedule-time",
			refreshPositions: false,
			axis: "y",
			revert: false,
			zIndex: 10,
			create: function (e, ui) {
			},
			drag: function (e, ui) {
				ui.position.left = 0;
				ui.position.top = Math.floor(ui.position.top / 40) * 40;
				checkOvertimeSingle(this);
				// show tamp time
				var tmpTime = timeByPositionY(ui.position.top);
				var tmpTimeEND = timeByPositionY(ui.position.top + $(obj).innerHeight());

				var s = [];
				s = tmpTime.split(":");

				var e = [];
				var ee = [];
				ee = tmpTimeEND.split(":");
				if (parseInt(ee[1]) == 59) {
					var hn = parseInt(ee[0]) + 1;
					e.push('' + hn + '');
					e.push('00');
				} else {
					e.push('' + ee[0] + '');
					var hn = parseInt(ee[1]);
					e.push('' + hn + '');
				}
				if (s[0] >= 12) {
					var hs = s[0];
					if (s[0] > 12) {
						hs = s[0] - 12;
					}
					var he = e[0] - 12;

					$(obj).find('.tmp-time-top').html(hs + ':' + s[1] + 'PM - ' + he + ':' + e[1] + 'PM');
				} else {
					if (s[0] < 12 && e[0] >= 12) {
						var he = e[0] - 12;
						if (e[0] == 12) {
							$(obj).find('.tmp-time-top').html(tmpTime + 'AM - ' + e[0] + ':' + e[1] + 'PM');
						} else {
							$(obj).find('.tmp-time-top').html(tmpTime + 'AM - ' + he + ':' + e[1] + 'PM');
						}
					} else {
						$(obj).find('.tmp-time-top').html(tmpTime + 'AM - ' + e[0] + ':' + e[1] + 'AM');
					}
				}
				//Endtime
			},
			start: function (e, ui) {
				dragscroll.reset();
				w = $('#table-schedule-time td:not(.time)').innerWidth() + 3;
				h = $('#table-schedule-time td:not(.time)').innerHeight();

				topStamp = ui.position.top;

				OtherEvent(this).forEach(function (obj, index) {
					$(obj).addClass('highlight');
				});

			},
			stop: function (e, ui) {
				let currentEle = this;
				let posTp = currentEle.offsetTop;
				let posBt = currentEle.offsetTop + $(currentEle).innerHeight();
				let isRevert = false;

				OtherEvent(this).forEach(function (obj, index) {
					let itTp = obj.offsetTop;
					let itBt = obj.offsetTop + $(obj).innerHeight();
					$(obj).removeClass('highlight');
					if (!$(currentEle).hasClass('parallel')) {
						if (posBt > itTp) {
							if (posTp < itBt) {
								isRevert = true;
								$(currentEle).animate({top: topStamp + 'px'});
							} else {
							}
						} else {
						}
					}


				});
				inColEvent(this).forEach(function (obj, index) {
					let itTp = obj.offsetTop;
					let itBt = obj.offsetTop + $(obj).innerHeight();
					if (posBt > itTp) {
						if (posTp < itBt) {
							isRevert = true;
							$(currentEle).animate({top: topStamp + 'px'}, function () {
							});
						} else {
						}
					} else {
					}
				});
				if (!isRevert) {
					checkOvertimeSingle(currentEle);
					console.log(timeByPositionY(ui.position.top));
					topStamp = 0;
					callbackStopDragg(timeByPositionY(ui.position.top), currentEle);
					// truyen bien ajax
				} else {
					setTimeout(function () {
						checkOvertimeSingle(currentEle);
						console.log(timeByPositionY(topStamp));
						topStamp = 0;
					}, 300);//animate 300ms

				}

			}
		}*/
		);
	} catch (ex) {
		console.log(ex);
	}
	if ($(obj).hasClass('free-axis')) {
		freeAxisOp(obj, function (timeB, element) {
			callbackStopDragg(timeB, obj);
		});
	}

}

function OpenEditMenu1(obj, date) {
	var $menu = $('#menu-edit-user');
	$menu.addClass('open');
}

function removeSch(obj) {
	//    $(obj).closest('.sch-event').remove();
}

function freeAxisOp(obj, callbackTL) {
	let $item = $(obj).closest('.sch-event');
	$item.find('.ev-top').children('.lb').remove();
	let wframe = 0;
	let topStamp = 0;
	let leftStamp = 0;
	let revertClass = '';
	let revertHeight = 0;
	try {
		$item.draggable(
		// 	"option", {
		// 	axis: '',
		// 	start: function (event, ui) {
		// 		dragscroll.reset();
		// 		topStamp = ui.position.top;
		// 		leftStamp = ui.position.left;
		// 		revertHeight = $(this).innerHeight();
		// 		wframe = $item.parent('.events').width();
		// 		//n4m edit 11-05-2024
		// 		if (wframe < 0)
		// 			wframe = wframe - 2;
		// 		else
		// 			wframe = wframe + 2;
		// 		OtherEvent(this).forEach(function (obj, index) {
		// 			$(obj).addClass('highlight');
		// 		});
		// 		revertClass = checkDisableOp(this);
		//
		//
		// 	},
		// 	drag: function (event, ui) {
		// 		let obj = this;
		// 		ui.position.left = Math.floor(ui.position.left / wframe) * wframe;
		// 		ui.position.top = Math.floor(ui.position.top / 40) * 40;
		// 		checkOvertimeSingle(this);
		//
		// 		let objLeft = this.offsetLeft + $(this).closest('td')[0].offsetLeft;
		//
		// 		//timeByPositionY(ui.position.top)
		// 		$(eventStore).find('td').each(function (index, ele) {
		// 			let eleLeft = ele.offsetLeft;
		// 			if (Math.abs(objLeft - eleLeft) <= 10) {
		// 				let typeNV = parseInt($(ele).data('id'));
		// 				updateEventByTier(obj, typeNV);
		// 			}
		// 		});
		// 		// show tamp time
		// 		var tmpTime = timeByPositionY(ui.position.top);
		// 		var tmpTimeEND = timeByPositionY(ui.position.top + $(obj).innerHeight());
		//
		// 		console.log(tmpTime);
		// 		console.log(tmpTimeEND);
		//
		// 		var s = [];
		// 		s = tmpTime.split(":");
		//
		// 		var e = [];
		// 		var ee = [];
		// 		ee = tmpTimeEND.split(":");
		// 		if (parseInt(ee[1]) == 59) {
		// 			var hn = parseInt(ee[0]) + 1;
		// 			e.push('' + hn + '');
		// 			e.push('00');
		// 		} else {
		// 			e.push('' + ee[0] + '');
		// 			var hn = parseInt(ee[1]);
		// 			e.push('' + hn + '');
		// 		}
		// 		if (s[0] >= 12) {
		// 			var hs = s[0];
		// 			if (s[0] > 12) {
		// 				hs = s[0] - 12;
		// 			}
		// 			var he = e[0] - 12;
		//
		// 			$(obj).find('.tmp-time-top').html(hs + ':' + s[1] + 'PM - ' + he + ':' + e[1] + 'PM');
		// 		} else {
		// 			if (s[0] < 12 && e[0] >= 12) {
		// 				var he = e[0] - 12;
		// 				if (e[0] == 12) {
		// 					$(obj).find('.tmp-time-top').html(tmpTime + 'AM - ' + e[0] + ':' + e[1] + 'PM');
		// 				} else {
		// 					$(obj).find('.tmp-time-top').html(tmpTime + 'AM - ' + he + ':' + e[1] + 'PM');
		// 				}
		// 			} else {
		// 				$(obj).find('.tmp-time-top').html(tmpTime + 'AM - ' + e[0] + ':' + e[1] + 'AM');
		// 			}
		// 		}
		// 	},
		// 	stop: function (event, ui) {
		// 		let currentEle = this;
		// 		let posTp = currentEle.offsetTop;
		// 		let posBt = currentEle.offsetTop + $(currentEle).innerHeight();
		// 		let isRevert = false;
		// 		$(this).find('.tmp-time-top').html('');
		//
		// 		if (ui.position.left != 0) {
		//
		// 			isRevert = moveOpaSch(currentEle, topStamp, $(currentEle.parentElement), revertClass);
		// 		} else {
		// 			// only time change
		// 			inColEvent(this).forEach(function (obj, index) {
		// 				let itTp = obj.offsetTop;
		// 				let itBt = obj.offsetTop + $(obj).innerHeight();
		// 				;
		// 				if (posBt > itTp) {
		// 					if (posTp < itBt) {
		// 						isRevert = true;
		// 						$(currentEle).animate({top: topStamp + 'px', left: 0 + 'px'}, function () {
		// 						});
		// 					} else {
		//
		// 					}
		// 				} else {
		//
		// 				}
		// 			});
		//
		// 			OtherEvent(this).forEach(function (obj, index) {
		// 				let itTp = obj.offsetTop;
		// 				let itBt = obj.offsetTop + $(obj).innerHeight();
		// 				$(obj).removeClass('highlight');
		//
		// 				if (!$(currentEle).hasClass('parallel')) {
		// 					if (posBt > itTp) {
		// 						if (posTp < itBt) {
		// 							isRevert = true;
		// 							$(currentEle).animate({top: topStamp + 'px'});
		// 						} else {
		// 						}
		// 					} else {
		// 					}
		// 				}
		// 			});
		// 		}
		// 		clearAllHighlightCol(this);
		// 		if (!isRevert) {
		// 			checkOvertimeSingle(currentEle);
		// 			console.log(timeByPositionY(ui.position.top));
		// 			topStamp = 0;
		// 			callbackTL(timeByPositionY(ui.position.top), obj);
		// 		} else {
		// 			$(currentEle).css({height: revertHeight + 'px'});
		// 			setTimeout(function () {
		// 				checkOvertimeSingle(currentEle);
		// 				console.log(timeByPositionY(topStamp));
		// 				topStamp = 0;
		//
		// 			}, 300)
		// 		}
		// 	}
		// }
		);
	} catch (ex) {
	}
}

function moveOpaSch(obj, revertTop, revertCont, revertClass) {
	let objLeft = obj.offsetLeft + $(obj).closest('td')[0].offsetLeft;
	let isRevert = false;
	$(eventStore).find('td').each(function (index, ele) {
		let eleLeft = ele.offsetLeft;
		if (Math.abs(objLeft - eleLeft) <= 10) {
			if ($(ele).hasClass(revertClass)) {
				isRevert = true;
				$(obj).animate({top: revertTop + 'px', left: 0 + 'px'});
				revertCont.append(obj);
				OtherEvent(obj).forEach(function (ele, index) {
					$(ele).removeClass('highlight');
				});
			} else {
				let typeNV = parseInt($(ele).data('id'));

				updateEventByTier(obj, typeNV);

				$(ele).find('.events').append(obj);
				$(obj).css({left: 0});
				// recheck inColEvent
				let posTp = obj.offsetTop;
				let posBt = obj.offsetTop + $(obj).innerHeight();
				inColEvent(obj).forEach(function (ele, index) {
					let itTp = ele.offsetTop;
					let itBt = ele.offsetTop + $(ele).innerHeight();

					if (posBt > itTp) {
						if (posTp < itBt) {
							//revert
							isRevert = true;
							$(obj).animate({top: revertTop + 'px'}, function () {
							});
							revertCont.append(obj);

						} else {
						}
					} else {
					}
				});

				OtherEvent(obj).forEach(function (ele, index) {
					let itTp = ele.offsetTop;
					let itBt = ele.offsetTop + $(ele).innerHeight();
					$(ele).removeClass('highlight');
					if (!$(obj).hasClass('parallel')) {
						if (posBt > itTp) {
							if (posTp < itBt) {
								isRevert = true;

								$(obj).animate({top: revertTop + 'px'}, function () {

								});
								revertCont.append(obj);

							} else {
							}
						} else {
						}
					}

				});
			}
		} else {

		}

	});
	return isRevert;
}

//danh sach thoi gian lam duoc cua nv theo dich vu
var TimeLevelStaff = [];
console.log(TimeLevelStaff);

function getLvsByServiceID(id) {
	var result = [];
	$.each(TimeLevelStaff, function (index, ele) {
		if (("sv-" + ele.ServiceUD) == id) {
			result = ele.User;
		}
	});
	return result;
}

function updateEventByTier(obj, tier) {
	if ($(obj).hasClass('Addon')) {
	} else {


		let rawB = $(obj).find('input.timeBM').val();
		let rawE_h = $(obj).find('input.timeEM').val().split(':')[0];
		let rawE_m = $(obj).find('input.timeEM').val().split(':')[1];
		let tierTime = 0;
		let newE_m = 0;
		let objSvClass = $(obj).attr('class').split(' ').filter(myClass => {
			let mystring = myClass,
				expr = /sv-/;
			return expr.test(mystring);
		})[0]; // [0] = has only one class
		var UserLv = getLvsByServiceID(objSvClass);

		$.each(UserLv, function (index, item) {
			if (item.UserID == parseInt(tier)) {
				tierTime = item.TimeLv;
			}
		});

		newE_m = parseInt(tierTime) + parseInt(rawE_m);
		if (newE_m >= 60) {
			rawE_h = parseInt(rawE_h) + 1;
			newE_m = parseInt(newE_m) - 60;
		}
		let topPosY = $(scheduleTable).find(`tr[data-date-time="${rawB}"]`)[0].offsetTop;
		let bottomPosY = $(scheduleTable).find(`tr[data-date-time="${rawE_h}:${newE_m == 0 ? '00' : newE_m < 10 ? '0' + newE_m : newE_m}"]`)[0].offsetTop;
		$(obj).css({height: (bottomPosY - topPosY) + 'px'});
	}

}

function checkDisableOp(obj) {
	let objLeft = obj.offsetLeft + $(obj).closest('td')[0].offsetLeft;
	let objClass = $(obj).attr('class').split(' ').filter(myClass => {
		let mystring = myClass,
			expr = /sv-/;
		return expr.test(mystring);
	})[0]; // [0] = has only one class

	$(eventStore).find('td').each(function (index, ele) {
		let eleLeft = ele.offsetLeft;
		if ($(ele).hasClass(objClass)) {
			createHighlightCol(ele);
		}
	});
	return objClass;
}

function createHighlightCol(obj) {
	let $cont = $("#table-schedule-time").parent();
	let $hlCol = $('<div class="hl-colnhe"></div>');
	$cont.append($hlCol);
	$hlCol.css({width: $(obj).innerWidth() + 'px', left: obj.offsetLeft + 'px', top: 0});
}

function clearAllHighlightCol(obj) {
	let $cont = $("#table-schedule-time").parent();
	$cont.find('.hl-colnhe').remove();
}

//export function handleRemoveSsAllEvent() {
//    let buttonElm = document.querySelectorAll('.handleRemoveSsAllEvent');
//    if (buttonElm.length > 0) {
//        buttonElm.forEach(function (button) {
//            button.addEventListener('click', () => {
//                let statusButton = button.getAttribute('data-status');
//                removeSsAllEvent(button.parentElement, statusButton)
//            })
//        })
//    }
//}
function removeSsAllEvent(obj, status = '', SbsID) {
	//let SbsID = $(obj).find('input.idE').val();
	var d = AppointmentJS.instance.invokeMethodAsync("BookingEnable", Number(SbsID)).then(result => {
		if (result) {
			removeSs(obj, status);
			OtherEvent(obj).forEach(function (ele, index) {
				removeSs(ele, status);
			});
			var a = $('input[value="' + SbsID + '"]').closest('.sch-event');
			a.find(".lbs .bell").remove();
		}
	});

	//$.ajax({
	//    type: "POST",
	//    url: "/Appointment/Book/AjaxBookingEnable",
	//    data: '{SbsID:' + SbsID + '}',
	//    contentType: "application/json; charset=utf-8",
	//    dataType: "json",
	//    success: function (msg) {
	//        if (msg) {
	//            removeSs(obj, status);
	//            OtherEvent(obj).forEach(function (ele, index) {
	//                removeSs(ele, status);
	//            });
	//            var a = $('input[value="' + SbsID + '"]').closest('.sch-event');
	//            a.find(".lbs .bell").remove();
	//            //loadWelcomeCus();
	//        }
	//    },
	//    error: function () {
	//        console.log(500);
	//    }
	//});
}

function removeSs(obj, status = '') {
	$(obj).removeClass(status);
}

//data functions
function autoFillInfo(obj) {
	let stringArr = obj.textContent.split('/');
	let $cont = $('#info-user');
	$cont.find('input[name="user-name"]').val(stringArr[0].trim());
	$cont.find('input[name="user-phone"]').val(stringArr[1].trim());
	$cont.find('input[name="user-email"]').val(stringArr[2].trim());
	$(obj).closest('.search-user-result').hide();
	$('#input-search').val('');
}

function getNewService(obj) {
	let $slservice = $('#addUser-selectService');
	let $slnhanvien = $('#addUser-selectOp');
	let $sltimestart = $('#addUser-selectTime');
	let $timeend = $('#addUser-ipTimeEnd');
}

//-------------------------n4m
//mở chi tiết đơn
//export function viewDetail() {
//    let buttonElm = document.querySelectorAll('.view-detail');
//    console.log(1111111);
//    console.log(buttonElm);
//    if (buttonElm.length > 0) {
//        //buttonElm.forEach(function (button) {
//        //    button.addEventListener('click', () => {
//        //        let session = button.getAttribute('data-session');
//        //        var d = AppointmentJS.instance.invokeMethodAsync("SessionDetailPopup", Number(SbsID)).then(result => { });    
//        //        console.log(session);
//        //    })
//        //})
//    }
//}

export function display_sesssion(session) {
	var d = AppointmentJS.instance.invokeMethodAsync("SessionDetailRender", Number(session)).then(result => {
		result.forEach(item => {
			try {
				//xoa truoc
				$('input[value="' + item.id + '"]').closest('.sch-event').remove();

				let tdIndex = document.getElementById(item.idStaff).cellIndex;
				if (item.type != "Extra") {
					addCustomer(
						item.starttime,
						item.endtime,
						item.tierTimeEnd,
						item.starttimemin,
						item.endtimemin,
						tdIndex,
						{
							id: item.id,
							color: item.color,
							mess: item.mess,
							cCount: item.cCount,
							isProcess: item.isProcess,
							isNew: item.isNew,
							SbID: item.sesionBookID,
							sTT: item.stt,
							cUstomerName: item.customerName,
							svName: item.svName,
							date: item.date,
							datenow: item.dateNow,
							draggable: item.draggable,
							statusservice: item.statusservice,
							BookingNoTurn: item.bookingNoTurn,
							Customerphone: item.customerphone,
							Note: item.note2,
							StatusSMS: item.statusSMS,
							SelectStaff: item.selectStaff,
							bkOnline: item.bookOnline,
							status_deposit: item.status_deposit,
							classCus: [
								item.cus,
								item.paid,
								item.booking,
								item.free,
								item.sv,
								item.type,
								item.finish,
								item.parallel
							],
							discountId: item.discountId,
							discountName: item.discountName,
						});
				} else {
					addBlankTime(item.starttime, item.endtime, tdIndex, item.id, item.dateNow, item.note);
				}
			} catch (err) {

			}

			//handleRemoveSsAllEvent();
			//viewDetail();
		});
		document.querySelectorAll('.ev-draggable').forEach(function (ele, index) {
			draggSch(ele, function (t, element) {
				console.log(t);
				var sbsID = $(element).find('input.idE').val();
				var a = $(element).find('input.idE').closest('td');
				console.log(a.attr('data-id'));
				//$.ajax({
				//    type: "POST",
				//    url: "/Appointment/Book/AjaxUpdateMoveService",
				//    data: '{HHmm:"' + t + '", SessionDetailID: ' + sbsID + ',UserID: ' + a.attr('data-id') + '}',
				//    contentType: "application/json; charset=utf-8",
				//    dataType: "json",
				//    success: function (msg) {

				//    },
				//    error: function () {
				//        console.log(500);
				//    }
				//});
				AppointmentJS.instance.invokeMethodAsync("UpdateMoveService", {
					HHmm: t,
					SessionDetailID: Number(sbsID),
					UserID: Number(a.attr('data-id'))
				})
			});
		});
	});
}

//xóa từng dịch vụ
export function delete_session_detail(session_detail_id) {
	$('input[value="' + session_detail_id + '"]').closest('.sch-event').remove();
}

jQuery(document).ready(function ($) {
	$(document).on("click", ".view-detail", function () {
		let session = $(this).attr('data-session');
		console.log(AppointmentJS.instance);
		if (AppointmentJS.instance !== null) {
			var d = AppointmentJS.instance.invokeMethodAsync("SessionDetailPopup", Number(session)).then(result => {
			});
			console.log(session);
		}
	});

	$(document).on("click", ".enable-booking", function () {
		if (AppointmentJS.instance !== null) {
			let statusButton = $(this).attr('data-status');
			let SbID = $(this).attr('data-sbs');
			console.log(11111111111111);
			removeSsAllEvent($(this).parent(), statusButton, SbID)
		}
	});

	$(document).on("click", ".delete-session", function () {
		if (AppointmentJS.instance !== null) {
			let session = $(this).attr('data-session');
			let status = $(this).attr('data-status');
			AppointmentJS.instance.invokeMethodAsync("DeleteBooking", Number(session), Number(status)).then(result => {
			});
		}
	});
	//xóa dịch vụ
	$(document).on("click", ".delete-service", function () {
		if (AppointmentJS.instance !== null) {
			let service = $(this).attr('data-service');
			AppointmentJS.instance.invokeMethodAsync("DeleteBookingService", Number(service)).then(result => {
			});
		}
	});
	//reset dịch vụ
	$(document).on("click", ".reset-service", function () {
		if (AppointmentJS.instance !== null) {
			let service = $(this).attr('data-service');
			AppointmentJS.instance.invokeMethodAsync("ResetBookingService", Number(service)).then(result => {
			});
		}
	});
	//thay doi session cho dịch vụ
	$(document).on("click", ".change-session", function () {
		if (AppointmentJS.instance !== null) {
			let service = $(this).attr('data-service');
			AppointmentJS.instance.invokeMethodAsync("ChangeSevicesToSession", Number(service)).then(result => {
			});
		}
	});
	//thay đổi thời gian dịch vụ
	$(document).on("click", ".change-time", function () {
		let session = $(this).attr('data-service');
		if (AppointmentJS.instance !== null) {
			var d = AppointmentJS.instance.invokeMethodAsync("ChangeTimeService", Number(session)).then(result => {
			});
		}
	});
});