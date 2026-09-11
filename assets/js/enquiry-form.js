(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;

  // ---------------------------------------------------------------
  // Web3Forms access key.
  //
  // TESTING: before wiring this up to peter@jackolivia.com, create a
  // throwaway test key at https://web3forms.com using your own email
  // address, paste it below, and confirm submissions arrive correctly
  // (including file attachments) before swapping in Peter's key.
  //
  // Getting Peter's real key: go to web3forms.com, enter
  // peter@jackolivia.com as the destination, copy the access key it
  // gives you, and paste it here in place of the placeholder. Peter
  // will get one verification email from Web3Forms and needs to click
  // the link in it once — after that every submission lands in his inbox.
  // ---------------------------------------------------------------
  var WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  var MAX_FILE_SIZE = 5 * 1024 * 1024;
  var UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var submitBtn = document.getElementById('submit-btn');
  var submitError = document.getElementById('submit-error');
  var successMessage = document.getElementById('success-message');
  var consentInput = document.getElementById('consent');

  // ---------------- field validation ----------------

  function fieldEl(name) {
    return form.querySelector('[name="' + name + '"]');
  }

  function errorEl(name) {
    return form.querySelector('.field-error[data-error-for="' + name + '"]');
  }

  function showError(name, message) {
    var el = errorEl(name);
    if (el) el.textContent = message;
  }

  function clearError(name) {
    showError(name, '');
  }

  function radioValue(name) {
    var checked = form.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : '';
  }

  var validators = {
    name: function () {
      var v = fieldEl('name').value.trim();
      if (v.length < 2) return 'Please enter your name.';
      return '';
    },
    email: function () {
      var v = fieldEl('email').value.trim();
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
      return '';
    },
    phone: function () {
      var v = fieldEl('phone').value.trim();
      if (v.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number.';
      return '';
    },
    addressLine1: function () {
      var v = fieldEl('addressLine1').value.trim();
      if (v.length < 3) return 'Please enter the first line of your address.';
      return '';
    },
    postcode: function () {
      var v = fieldEl('postcode').value.trim();
      if (!UK_POSTCODE.test(v)) return 'Please enter a valid UK postcode.';
      return '';
    },
    consent: function () {
      if (!consentInput.checked) return 'Please confirm consent before submitting.';
      return '';
    }
  };

  function validateField(name) {
    var message = validators[name]();
    showError(name, message);
    return !message;
  }

  function validateAll() {
    var valid = true;
    var firstInvalid = null;
    Object.keys(validators).forEach(function (name) {
      var ok = validateField(name);
      if (!ok) {
        valid = false;
        if (!firstInvalid) firstInvalid = name;
      }
    });
    return { valid: valid, firstInvalid: firstInvalid };
  }

  // Validate text-style fields on blur.
  ['name', 'email', 'phone', 'addressLine1', 'postcode'].forEach(function (name) {
    var el = fieldEl(name);
    if (!el) return;
    el.addEventListener('blur', function () { validateField(name); });
    el.addEventListener('input', function () {
      if (errorEl(name).textContent) validateField(name);
    });
  });

  var descriptionEl = form.querySelector('#description');

  // ---------------- project status "Other" reveal ----------------

  var projectStatusOtherWrap = document.getElementById('projectStatusOtherWrap');
  form.querySelectorAll('input[name="projectStatus"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (projectStatusOtherWrap) {
        projectStatusOtherWrap.classList.toggle('is-open', radio.value === 'other' && radio.checked);
      }
    });
  });

  // ---------------- service accordion ----------------

  form.querySelectorAll('input[name="service"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      form.querySelectorAll('.service-option').forEach(function (option) {
        var input = option.querySelector('input[name="service"]');
        option.classList.toggle('selected', input.checked);
      });
    });
  });

  // ---------------- consent gates submit ----------------

  function syncSubmitState() {
    submitBtn.disabled = !consentInput.checked;
  }
  consentInput.addEventListener('change', function () {
    clearError('consent');
    syncSubmitState();
  });
  syncSubmitState();

  // ---------------- upload zones ----------------

  var zoneFiles = new Map();

  function formatSize(bytes) {
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + 'KB';
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
  }

  function renderZone(zone) {
    var files = zoneFiles.get(zone) || [];
    var list = zone.querySelector('.upload-file-list');
    list.innerHTML = '';
    files.forEach(function (file, index) {
      var chip = document.createElement('span');
      chip.className = 'upload-file-chip';
      chip.textContent = file.name + ' (' + formatSize(file.size) + ')';
      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'upload-file-remove';
      remove.setAttribute('aria-label', 'Remove ' + file.name);
      remove.textContent = '×';
      remove.addEventListener('click', function () {
        files.splice(index, 1);
        zoneFiles.set(zone, files);
        renderZone(zone);
      });
      chip.appendChild(remove);
      list.appendChild(chip);
    });
  }

  function addFiles(zone, fileList) {
    var files = zoneFiles.get(zone) || [];
    var errorText = '';
    Array.prototype.forEach.call(fileList, function (file) {
      if (file.size > MAX_FILE_SIZE) {
        errorText = 'File too large. Please compress it below 5MB or email peter@jackolivia.com directly.';
        return;
      }
      files.push(file);
    });
    zoneFiles.set(zone, files);
    zone.querySelector('.upload-error').textContent = errorText;
    renderZone(zone);
  }

  form.querySelectorAll('.upload-zone').forEach(function (zone) {
    var input = zone.querySelector('.upload-input');
    var trigger = zone.querySelector('.upload-trigger');

    trigger.addEventListener('click', function () { input.click(); });

    input.addEventListener('change', function () {
      addFiles(zone, input.files);
      input.value = '';
    });

    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', function () {
      zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files) addFiles(zone, e.dataTransfer.files);
    });
  });

  function filesForSelectedService() {
    var selected = form.querySelector('.service-option.selected .upload-zone');
    if (!selected) return [];
    return zoneFiles.get(selected) || [];
  }

  function generalFiles() {
    var zone = form.querySelector('.upload-zone[data-zone="general"]');
    return zoneFiles.get(zone) || [];
  }

  // ---------------- submit ----------------

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitError.hidden = true;

    var result = validateAll();
    if (!result.valid) {
      var invalidEl = fieldEl(result.firstInvalid);
      if (invalidEl) invalidEl.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';

    var formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New enquiry — ' + fieldEl('name').value.trim() + (radioValue('service') ? ' — ' + radioValue('service') : ''));
    formData.append('from_name', 'Jack Olivia Enquiry Form');

    formData.append('name', fieldEl('name').value.trim());
    formData.append('email', fieldEl('email').value.trim());
    formData.append('phone', fieldEl('phone').value.trim());
    formData.append('addressLine1', fieldEl('addressLine1').value.trim());
    formData.append('postcode', fieldEl('postcode').value.trim());
    formData.append('propertyType', radioValue('propertyType'));
    formData.append('service', radioValue('service'));
    formData.append('description', descriptionEl.value.trim());
    formData.append('projectStatus', radioValue('projectStatus'));
    formData.append('projectStatusOther', form.querySelector('#projectStatusOther').value.trim());
    formData.append('timeline', radioValue('timeline'));
    formData.append('rightmoveLink', form.querySelector('#rightmoveLink').value.trim());
    formData.append('consent', 'true');

    filesForSelectedService().forEach(function (file, i) {
      formData.append('service_file_' + (i + 1), file);
    });
    generalFiles().forEach(function (file, i) {
      formData.append('general_file_' + (i + 1), file);
    });

    formData.append('botcheck', form.querySelector('[name="botcheck"]').value);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.success) {
          form.hidden = true;
          successMessage.hidden = false;
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          submitError.textContent = data.message || 'Submission failed. Please try again.';
          submitError.hidden = false;
        }
      })
      .catch(function () {
        submitError.textContent = 'Network error. Please try again or email peter@jackolivia.com directly.';
        submitError.hidden = false;
      })
      .finally(function () {
        submitBtn.disabled = !consentInput.checked;
        submitBtn.textContent = 'SUBMIT ENQUIRY';
      });
  });
})();
