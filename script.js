document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("login-screen");
    const homeScreen = document.getElementById("home-screen");

    window.login = function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username.trim() !== "" && password.trim() !== "") {
            loginScreen.classList.add("hidden");
            homeScreen.classList.remove("hidden");
        } else {
            alert("Please enter both username and password.");
        }
    };

    window.logout = function () {
        homeScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    };
});

document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menu-btn");
    const sideMenu = document.getElementById("side-menu");
    const closeMenu = document.getElementById("close-menu");

    if (menuBtn && sideMenu && closeMenu) {
        menuBtn.addEventListener("click", function() {
            sideMenu.classList.add("open");
        });

        closeMenu.addEventListener("click", function() {
            sideMenu.classList.remove("open");
        });
    }

    const accessibilityModal = document.getElementById("accessibility-modal");
    const closeAccessibility = document.getElementById("close-accessibility");
    const menuItems = document.querySelectorAll('.side-menu-item');
    menuItems.forEach(item => {
        if (item.textContent.toLowerCase().includes('choose language') || item.textContent.toLowerCase().includes('speech')) {
            item.addEventListener('click', function() {
                accessibilityModal.classList.remove('hidden');
            });
        }
    });
    if (closeAccessibility) {
        closeAccessibility.addEventListener('click', function() {
            accessibilityModal.classList.add('hidden');
        });
    }

    const voiceModal = document.getElementById("voice-modal");
    const closeVoice = document.getElementById("close-voice");
    const backVoice = document.getElementById("back-voice");
    const speakNowOptions = Array.from(document.querySelectorAll('.modal-option')).filter(opt =>
        opt.textContent.toLowerCase().includes('speech') ||
        opt.textContent.toLowerCase().includes('voice over')
    );
    speakNowOptions.forEach(option => {
        option.addEventListener('click', function() {
            accessibilityModal.classList.add('hidden');
            voiceModal.classList.remove('hidden');
        });
    });
    if (closeVoice) {
        closeVoice.addEventListener('click', function() {
            voiceModal.classList.add('hidden');
        });
    }
    if (backVoice) {
        backVoice.addEventListener('click', function() {
            voiceModal.classList.add('hidden');
            accessibilityModal.classList.remove('hidden');
        });
    }

    const voiceSettingsModal = document.getElementById("voice-settings-modal");
    const closeVoiceSettings = document.getElementById("close-voice-settings");
    const backVoiceSettings = document.getElementById("back-voice-settings");
    const voiceSettingsOptions = Array.from(document.querySelectorAll('.modal-option')).filter(opt =>
        opt.textContent.toLowerCase().includes('display & text size') ||
        opt.textContent.toLowerCase().includes('audio description')
    );
    voiceSettingsOptions.forEach(option => {
        option.addEventListener('click', function() {
            accessibilityModal.classList.add('hidden');
            voiceSettingsModal.classList.remove('hidden');
        });
    });
    if (closeVoiceSettings) {
        closeVoiceSettings.addEventListener('click', function() {
            voiceSettingsModal.classList.add('hidden');
        });
    }
    if (backVoiceSettings) {
        backVoiceSettings.addEventListener('click', function() {
            voiceSettingsModal.classList.add('hidden');
            voiceModal.classList.remove('hidden');
        });
    }

    if (voiceModal) {
      voiceModal.setAttribute("tabindex", "-1");
      voiceModal.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
          const dots = voiceModal.querySelectorAll('.voice-dot');
          dots.forEach(dot => {
            dot.style.boxShadow = "0 0 16px 4px #ffe500";
            setTimeout(() => dot.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)", 300);
          });
        }
      });

      voiceModal.addEventListener("click", function(e) {
        const firstChild = voiceModal.firstElementChild;
        const nextSibling = firstChild ? firstChild.nextElementSibling : null;
        
        const appendElement = document.createElement("div");
        appendElement.className = "dynamic-element-append";
        appendElement.textContent = "Appended Element!";
        appendElement.style.padding = "10px";
        appendElement.style.margin = "10px";
        appendElement.style.backgroundColor = "#e0f0ff";
        appendElement.style.borderRadius = "5px";
        
        const prependElement = document.createElement("div");
        prependElement.className = "dynamic-element-prepend";
        prependElement.textContent = "Prepended Element!";
        prependElement.style.padding = "10px";
        prependElement.style.margin = "10px";
        prependElement.style.backgroundColor = "#ffe0e0";
        prependElement.style.borderRadius = "5px";
        
        voiceModal.append(appendElement);
        voiceModal.prepend(prependElement);
        
        console.log("First child:", firstChild);
        console.log("Next sibling:", nextSibling);
        
        setTimeout(() => {
          appendElement.remove();
          prependElement.remove();
        }, 3000);
      });

      const observer = new MutationObserver(() => {
        if (!voiceModal.classList.contains('hidden')) {
          voiceModal.focus();
        }
      });
      observer.observe(voiceModal, { attributes: true, attributeFilter: ['class'] });
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
      }
    }
    document.querySelectorAll('.voice-settings-row').forEach(row => {
      if (row.querySelector('.modal-arrow')) {
        row.addEventListener('click', function() {
          showToast('This feature is coming soon!');
        });
      }
    });
    document.querySelectorAll('.switch input[type="checkbox"]').forEach(input => {
      input.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change'));
        }
      });
    });

    const languageSettingsModal = document.getElementById("language-settings-modal");
    const closeLanguageSettings = document.getElementById("close-language-settings");
    const languageSettingsRow = Array.from(document.querySelectorAll('.voice-settings-row')).find(row =>
      row.textContent.trim().toLowerCase().startsWith('language settings')
    );
    if (languageSettingsRow && languageSettingsModal) {
      languageSettingsRow.addEventListener('click', function(e) {
        if (e) e.stopPropagation();
        document.getElementById('voice-settings-modal').classList.add('hidden');
        languageSettingsModal.classList.remove('hidden');
      });
    }
    if (closeLanguageSettings) {
      closeLanguageSettings.addEventListener('click', function() {
        languageSettingsModal.classList.add('hidden');
      });
    }
});

