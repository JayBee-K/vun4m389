export function handleViewPassWord() {
	const btnViewPass = document.querySelector('.view-pass');
	if(btnViewPass){
		btnViewPass.addEventListener("click", function() {
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


handleViewPassWord();


