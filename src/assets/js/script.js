function checkPassword() {
    var password = document.getElementById("password").value;
    var alert = document.getElementById("alert");
    var passwordInput = document.getElementById("password");
    var confirmButton = document.getElementById("confirm-button");
    var attempts = parseInt(localStorage.getItem("attempts")) || 0;

    if (password.trim() === "") {
        passwordInput.classList.add("invalid");
        alert.classList.add("show", "invalid");
        alert.textContent =
            "공백은 사용할 수 없습니다. 1자리에서 12자리 사이의 소문자, 정수, @, /, ! 특수문자로 이루어진 패스워드를 입력하세요.";
    } else if (/^[a-z\d@/!]{1,12}$/.test(password)) {
        if (password === "123412341234") {
            var redirectUrl = prompt(
                "비밀번호가 일치합니다. 이동할 페이지 URL을 입력하세요.",
                "https://www.naver.com"
            );
            if (redirectUrl !== null) {
                window.location.href = redirectUrl;
            }
        } else {
            attempts++;
            localStorage.setItem("attempts", attempts);
            if (attempts >= 3) {
                passwordInput.disabled = true;
                confirmButton.disabled = true;
                alert.classList.add("show", "invalid");
                alert.textContent =
                    "3회 이상 잘못 입력하셨습니다. " +
                    10 +
                    "초 후에 페이지가 새로고침됩니다.";
                localStorage.setItem("attempts", 0);
                setTimeout(function () {
                    location.reload();
                }, 10000);
            } else {
                passwordInput.classList.add("invalid");
                alert.classList.add("show", "invalid");
                alert.textContent =
                    "암호가 올바르지 않습니다. " + (3 - attempts) + "회 남았습니다.";
                passwordInput.value = "";
            }
        }
    } else {
        passwordInput.classList.add("invalid");
        alert.classList.add("show", "invalid");
        alert.textContent = "1자리에서 12자리 사이의 소문자, 정수, @, /, ! 특수문자 외에는 암호로 사용될 수 없습니다.";
        passwordInput.value = "";
    }
}

var passwordInput = document.getElementById("password");
passwordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkPassword();
    }
});

var confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", checkPassword);

localStorage.setItem("attempts", "0");
