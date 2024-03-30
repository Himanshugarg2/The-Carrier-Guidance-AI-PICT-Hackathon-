const firebaseConfig = {
    apiKey: "AIzaSyAJF8IkGq0-KRvLOKf3KE38qCdsrXaN7nM",
    authDomain: "feedbackform-4ea4d.firebaseapp.com",
    databaseURL: "https://feedbackform-4ea4d-default-rtdb.firebaseio.com",
    projectId: "feedbackform-4ea4d",
    storageBucket: "feedbackform-4ea4d.appspot.com",
    messagingSenderId: "50771740077",
    appId: "1:50771740077:web:528ad4a3ff5293c8838d24",
    measurementId: "G-7L30T5V0PF"
  };

  firebase.initializeApp(firebaseConfig);

  var feedbackformDB = firebase.database().ref("feedbackform");

  document.getElementById("feedbackform").addEventListener("submit", submitForm);

  function submitForm(e){
    e.preventDefault();

    var name = getElementVal('name');
    var emailID = getElementVal('emailID');
    var msgContent = getElementVal('msgContent');
    var phnumber = getElementVal('phnumber');
    var option = getElementVal('option');
    var answer = getElementVal('answer');
    var rate = getElementVal('rate');
    
    saveMessages(name, emailID, msgContent, phnumber, option, answer, rate);

    document.querySelector(".alert").style.display = "block";

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
        window.location.href = "index2.html";
    }, 3000);

    document.getElementById("feedbackform").reset();
  } 


  const saveMessages = (name, emailID, msgContent, phnumber, option, answer, rate) => {
    var newfeedbackform = feedbackformDB.push();

    newfeedbackform.set({
        name : name,
        emailID : emailID,
        msgContent : msgContent,
        phnumber : phnumber,
        option : option,
        answer : answer,
        rate : rate
    });
  };

  const getElementVal = (id) =>{
    return document.getElementById(id).value;
  };

  const validateForm = (name, emailID, msgContent, phnumber, option, answer, rate) => {
    if (name.trim() === '' || emailID.trim() === '' || msgContent.trim() === '' || phnumber.trim() === '' || option.trim() === '' || answer.trim() === '' || rate.trim() === '') {
        alert('Please fill in all fields.'); // You can use any other way to display error message
        return false; // Return false to prevent form submission
    }
    return true; // Return true if validation passes
};

  'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

