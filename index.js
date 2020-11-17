 /* When the page loads get the ATM accounts out of local storage */ 
 //let atm = new Atm(); 
 //atm.accounts = JSON.parse(localStorage.getItem("atm_accts")); 
 /* if there are no accounts, make sure we initialize with an empty array */
 //if(atm.accounts === null){
   //  atm.accounts = []; 
 //}

 /*----------- the code to manipute data/ logic goes here --------*/ 
 //Constructor function, creates ATM with methods to create and account and get an existing accounts.
 class Atm {
     constructor (){
     this.accounts = [];
     this.currentAccount = null; 
     }
 //creates a new account and pushes it into accounts array
     createAccount(pin){
             let newAccount = new Account(pin);
             this.accounts.push(newAccount);
             this.currentAccount = newAccount; 
             updateATM(); 
             return newAccount; 
     };

     updateAccount(newPIN){
  // let arrAccount = atm.getAccount(atm.currentAccount.pin);
 //   atm.accounts[currentAcct.index].pin = pin;   
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].pin === this.currentAccount.pin) {
                console.log ("updateAccount?");
                //return account that mathces PIN
                this.currentAccount.changePIN(newPIN);
                this.accounts[i] = this.currentAccount;
                updateATM();
                console.log ("updateATM?");
            }
        }
    
     }
 //loops throug exisitng accounts to see if the PIN entered exists, if it does, open is and sets it as current account
     getAccount(pin){
         for (let i = 0; i < this.accounts.length; i++) {
             if (this.accounts[i].pin === pin) {
                 //return the bank account that matches our pin
                 console.log ("GetAccount");
                 this.currentAccount = this.accounts[i]; 
                 updateATM(); 
                 return this.accounts[i];
             }
         }
         return null; 
     }; 
    }
    
    let atm = new Atm(); 
 atm.accounts = JSON.parse(localStorage.getItem("atm_accts")); 
 /* if there are no accounts, make sure we initialize with an empty array */
 if(atm.accounts === null){
     atm.accounts = []; 
 }

 //Accounts constructor with the math for the funtions
 class Account { 
     constructor(pin){
     this.pin = pin;
     this.balance = 0;
     };
     //withdrawal
     withdrawal(wdAmount){
         
         this.balance = this.balance - wdAmount - 1.00; 
         updateATM(); 
     };

     //deposit 
     deposit(depAmount){

        
        
            this.balance = this.balance + depAmount - 1.00;
            updateATM(); 
       
          
           
     };
     changePIN(newPIN) {
         this.pin = newPIN;
         console.log ("newPIN??")
         updateATM();

     };
     
     }
 
 //we need to access this to update the PIN
 function updateATM(){ 
     console.log(atm.accounts);
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
     //clear current account
     atm.currentAccount = null;
     
 }

 function displayBalance() { 
     document.getElementById("balance").innerHTML = 
     atm.currentAccount.balance; 
 }

 function displayWithrawal() {
     confirm("There is a $1.00 fee associated with this transaction, would you like to proceed?");

     let amount = Number(prompt("How much would you like to withdrawal?", ""));

     if (amount <= 200 && (amount % 20 === 0) && amount < atm.currentAccount.balance){
     
     atm.currentAccount.withdrawal(amount); 
     displayBalance(); 
    } else {
        alert("The amount needs to be in increments of $20, less than $200 and no more than your current balance");
    } 
 }
 
 function displayDeposit() {
    
    confirm("There is a $1.00 fee associated with this transaction, would you like to proceed?");
     
    let amount = Number(prompt("How much would you like to deposit?", ""));
    if (amount <= 200 && (amount % 20 === 0)) {

    atm.currentAccount.deposit(amount); 
     displayBalance(); 
    } else {
        alert("Please enter an amount less than $200 and in increments of 20!");
    }
}
 function displayChangePIN() {
    let pin = Number(prompt("Enter new PIN", ""));

    if (pin >= 1000 && pin <= 9999){
        if(atm.getAccount(pin) === null){
        console.log("changePIN?");
        atm.updateAccount(pin);
        console.log ("did we change PIN")
        /*atm.currentAccount.changePIN(newPIN);
        displayBalance();*/

        } else {
        alert("This PIN is in use, please choose a different PIN");
        }
    }else {
        alert("Enter a PIN that is 4 numbers in length");
    }   
 }
 //accesses the ATM constructor funtions to see if there is a current account with that PIN otherwise creates new account
 function newAccount(){
         let pin = parseInt(document.getElementById("newpinput").value);

         if (pin >= 1000 && pin <= 9999){

            if(atm.getAccount(pin) != null){
             alert("This account exists!"); 
            } else {
             atm.createAccount(pin);
             displayMenu(); 
         } 
        }else {
            alert("Enter a PIN that is 4 numbers in length");
        }
     }
 //accesses teh ATM constructor to check if account exists and logs in if it does.
 function login() {
     let pin = parseInt(document.getElementById("pinput").value);
     let acct = atm.getAccount(pin);
     if( acct === null){
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