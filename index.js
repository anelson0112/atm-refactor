 /* When the page loads get the ATM accounts out of local storage */ 
 let atm = new Atm(); 
 atm.accounts = JSON.parse(localStorage.getItem("atm_accts")); 
 /* if there are no accounts, make sure we initialize with an empty array */
 if(atm.accounts === null){
     atm.accounts = []; 
 }

 /*----------- the code to manipute data/ logic goes here --------*/ 
 //Constructor function, creates ATM with methods to create and account and get an existing accounts.
 function Atm() {
     this.accounts = [];
     this.currentAccount = null; 
 //creates a new account and pushes it into accounts array
     this.createAccount = function (pin){
             let newAccount = new Account(pin);
             this.accounts.push(newAccount);
             this.currentAccount = newAccount; 
             updateATM(); 
             return newAccount; 
     };
 //loops throug exisitng accounts to see if the PIN entered exists, if it does, open is and sets it as current account
     this.getAccount = function (pin){
         for (let i = 0; i < this.accounts.length; i++) {
             if (this.accounts[i].pin === pin) {
                 //return the bank account that matches our pin
                 this.currentAccount = this.accounts[i]; 
                 updateATM(); 
                 return this.accounts[i];
             }
         }
         return null; 
     }; 
 }
 //Accounts constructor with the math for the funtions
 function Account(pin) { 
     this.pin = pin;
     this.balance = 0;

     //withdrawal
     this.withdrawal = function(wdAmount){
         this.balance = this.balance - wdAmount - 1.00; 
         updateATM(); 
     }

     //deposit 
     this.deposit = function(depAmount){
         this.balance = this.balance + depAmount - 1.00;
         updateATM(); 
     }
     this.changePIN = function(newPIN) {
         this.pin = newPIN;
         updateATM();

     }
       

 }
 //we need to access this to update the PIN
 function updateATM(){ 
     localStorage.setItem("atm_accts",  JSON.stringify(atm.accounts) ); 
     

     
 }

 /*-------------  UI side/display logic ------------------------*/ 
 /*------------- The methods to manipulate UI go here ----------*/
 
 //display login
 function returnToMenu(){
     /* clear the fields in the menu */ 
     document.getElementById("balance").innerHTML = null;

     /* clear current account */ 
     atm.currentAccount = null; 

     /* hide the menu and display the login */ 
     document.getElementById("menu").style.display = "none";
     document.getElementById("start").style.display = "block";
     
 }

 function displayBalance() { 
     document.getElementById("balance").innerHTML = 
     atm.currentAccount.balance; 
 }

 function displayWithrawal() {
     confirm("There is a $1.00 fee associated with this transaction, would you like to proceed?");
     let amount = Number(prompt("How much would you like to withdrawal?", ""));
     
     atm.currentAccount.withdrawal(amount); 
     displayBalance(); 
 }
 
 function displayDeposit() {
    confirm("There is a $1.00 fee associated with this transaction, would you like to proceed?");;
     let amount = Number(prompt("How much would you like to deposit?", ""));
     
     atm.currentAccount.deposit(amount); 
     displayBalance(); 
 }
 function displayChangePIN() {
    let newPIN = Number(prompt("Enter new PIN", ""));

    if(atm.getAccount(newPIN) != null){
        alert("This PIN is in use, please choose a different PIN"); 

    } else {
    
    atm.currentAccount.changePIN(newPIN);
    displayBalance();
    }
 }
 //accesses the ATM constructor funtions to see if there is a current account with that PIN otherwise creates new account
 function newAccount(){
         let pin = parseInt(document.getElementById("newpinput").value);
         if(atm.getAccount(pin) != null){
             alert("This account exists!"); 
         } else {
             atm.createAccount(pin);
             displayMenu(); 
         } 
     }
 //accesses teh ATM constructor to check if account exists and logs in if it does.
 function login() {
     let pin = parseInt(document.getElementById("pinput").value);
     atm.getAccount(pin);
     if( atm.currentAccount === null){
         alert("Invalid pin!"); 
     } else {
         displayMenu(); 
     }
 }
 
 // hides menu until log in then hides log in menu
 function displayMenu(){
    
     /* clear the fields in the menu */ 
     document.getElementById("pinput").value = null; 
     document.getElementById("newpinput").value = null;; 

     /* hide the login and display the menu */ 
     document.getElementById("start").style.display = "none";
     document.getElementById("menu").style.display = "block";
 }
 let d = new Date();
 document.getElementById("date").innerHTML = d;