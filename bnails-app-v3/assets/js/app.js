export function handleViewPassWord() {
    const btnViewPass = document.querySelector('.view-pass');
    if (btnViewPass) {
        btnViewPass.addEventListener("click", function () {
            let elm_id = btnViewPass.getAttribute('data-id');
            let inputId = document.getElementById(elm_id);

            const hasClassShow = btnViewPass.classList.contains('is-show');
            if (hasClassShow) {
                btnViewPass.innerHTML = '<i class="fas fa-eye">';
                btnViewPass.classList.remove('is-show');
                inputId.setAttribute('type', 'password');
            } else {
                btnViewPass.innerHTML = '<i class="fas fa-eye-slash">';
                btnViewPass.classList.add('is-show');
                inputId.setAttribute('type', 'text');
            }
        })
    }
}

export function handleInitMaterialDate() {
    let handleInitMaterial = document.querySelectorAll('.handleInitMaterial');
    if (handleInitMaterial !== null) {
        handleInitMaterial.forEach(function (item) {
            const picker = new MaterialDatePicker().on('submit', (val) => {
                item.value = moment(val.toDate()).format('DD/MM/YYYY');
            })

            item.addEventListener('click', function () {
                picker.open()
            });
        });
    }
}
export function handlePopupTheme() {
    if ($('#handlePopup').length) {
        setTimeout(function () {
            $('body').addClass('show-popup')
        }, 500);


        $('#popupClose').click(function () {
            if($('body').hasClass('show-popup')) {
                $('body').removeClass('show-popup')
            }
        })
    }
}

handleViewPassWord();
handleInitMaterialDate();
handlePopupTheme();

