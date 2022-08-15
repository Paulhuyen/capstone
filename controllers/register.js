import { User } from "../models/User.js";




let userGender;


document.querySelector('input[value=true]').addEventListener('click', () =>{
    userGender = true;
    console.log('userGender',userGender);
    document.getElementById('gender').value = true;
})
document.querySelector('input[value=false]').addEventListener('click', () =>{
    userGender = false;
    console.log('userGender',userGender);
    document.getElementById('gender').value = false;
})

document.getElementById('btnSubmit').onclick = async function() {
    let user = new User();
    user.email = document.getElementById('email').value;
    user.password = document.getElementById('password').value;
    user.name = document.getElementById('name').value;
    user.phone = +document.getElementById('phone').value;
    // user.gender = document.getElementById('gender').value;
    user.gender = userGender;


    if(user.gender === undefined ){
        return alert ("Bạn chưa chọn giới tính!");
    }

    var isValid = validation();
    if(!isValid){
        return alert ("Vui lòng kiểm tra các input");
    }


    
    function validation(){
        var isValid = document.getElementById("formUser").checkValidity();
        // => kiểm tra toàn bộ input trong form
    
        console.log('isValid: ',isValid);
        if(!isValid){
            // Kiểm tra Email
            var inpEmail = document.getElementById("email");
            var spanEmail = document.getElementById("spanEmail");
            console.log(inpEmail);
            if(inpEmail.validity.valueMissing){
                spanEmail.innerHTML = "Email không được để trống nha";
            } else if (inpEmail.validity.patternMismatch){
                spanEmail.innerHTML = "Email không đúng định dạng";

            } else {
                spanEmail.innerHTML = ""

            }        
            // Kiểm tra Password
            var inpPassword = document.getElementById("password");
            var spanPassword = document.getElementById("spanPassword");
            if(inpPassword.validity.valueMissing){
                spanPassword.innerHTML = "Password không được để trống";
            } else if (inpPassword.validity.patternMismatch){
                spanPassword.innerHTML = "Password không đúng định dạng. Phải có tối thiểu 6 và tối đa 10 ký tự, ít nhất một chữ cái viết hoa(A-Z), một kí số(0-9) và một ký tự đặc biệt ( một trong các kí tự sau: @$!%*?&}";
            } else {
                spanPassword.innerHTML = "";
            }
            
            // Kiểm tra passwordConfirm
            var inpPasswordConfirm = document.getElementById("passwordConfirm");
            var spanPasswordConfirm = document.getElementById("spanConfirm");
            
            if(user.password !== inpPasswordConfirm.value){
                spanPasswordConfirm.innerHTML = 'Password confirm chưa giống với password';
  
            } else {
                spanPasswordConfirm.innerHTML = '';
            }

            // DOM tới input name và kiểm tra hợp lệ
            var inpName= document.getElementById("name");
            var spanName= document.getElementById("spanName");
            if(inpName.validity.valueMissing){
                spanName.innerHTML = "Tên người dùng không được để trống";
            } else if (inpName.validity.patternMismatch){
                spanName.innerHTML = "Tên người dùng không đúng định dạng";
            } else {
                spanName.innerHTML = "";
            }

            // DOM tới select phone và kiểm tra hợp lệ
            var inpPhone= document.getElementById("phone");
            var spanPhone= document.getElementById("spanPhone");
            if(inpPhone.validity.valueMissing){
                spanPhone.innerHTML = "Số điện thoại không được để trống";
            } else if (inpPhone.validity.patternMismatch){
                spanPhone.innerHTML = "Số điện thoại không đúng định dạng (ví dụ: 0123456789 hoăc 123456789)";
            } else {
                spanPhone.innerHTML = "";
            }
        }
        return isValid;
    }



    var mess = '';
    try {
        var result = await axios ({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'POST',
            data: user,
    
        });
        mess = result.data
        console.log(mess.content)
        alert (mess.message);
    }
    catch (err){
        console.log(err.response?.data.content)
        alert('Email này đã được sử dụng để đăng kí');
    }
    
}