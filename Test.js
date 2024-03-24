class Customer{
    name="";
    address="";
    phone="";
    email="";
    accounts=[];
    constructor(name,address,phone,email){
        this.name=name;
        this.address=address;
        this.phone=phone;
        this.email=email;
    }
verify(name,address,phone,email){
    if(!this.name === name && this.address === address && 
        this.phone === phone && this.email === email){
        return true;
    }else{
        return false;
    }
}
getAccount(){
    return this.accounts;
}
createAccount(bank, accountType){
    return bank.createAccount(accountType)
}
}


class Account {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.transactions = [];
        this.customer = null; 
    }

    deposit(amount) {
        console.log(`การฝากเงิน ${amount} เข้าไปที่บัญชี ${this.accountNumber}`);
        this.balance += amount;
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            console.log(`การถอน ${amount} จากบัญชี ${this.accountNumber}...`);
            this.balance -= amount;
        } else {
            console.error("เงินไม่เพียงพอ");
        }
    }
    createTransaction(transactionId, transactionType, amount, transactionDate, status) {
        console.log(`สร้างธุรกรรม ${transactionId} ประเภท ${transactionType}`);
        const transaction = new Transaction(transactionId, transactionType, amount, transactionDate, status);
        this.transactions.push(transaction);
    }

    getTransaction() {
        return this.transactions;
    }

    getBalance() {
        return this.balance;
    }

    getCustomer() {
        return this.customer; 
    }

    setCustomer(customer) {
        this.customer = customer; 
    }

    getAccountType() {
        return this.accountType;
    }

    setAccountType(accountType) {
        this.accountType = accountType;
    }
}

class Bank {
    name="";
    address="";
    code="";
    constructor(name,address,code){
        this.name=name;
        this.address=address;
        this.code=code;
    }
manage(){
    console.log("การจัดการของธนาคาร");
}
maintain(){
    console.log("ขออภัยระบบขัดข้องไม่สามารถชั่วคราว");
}
verify(){
    console.log("ตรวจสอบธนาคาร");
}
openAccount(){
    console.log("เปิดบัญชี");
}
closeAccount(){
    console.log("ปิดบัญชี");
}
createTransction(){
    console.log("กำลังทำธุรกรรม");
}
creareCustomer(name, address, phone, email){
    const customer = Customer("Tan","NakhonPathom","00011111","qaz1234@gmail.com")
    return customer
}
createATM(){
    const atm = new ATM("BankNPRU","SE_bank")
    return atm;
}
createAccount(accountType){
    let account;
    if (accountType === "currentAccount"){
        account = new CurrentAccount("654259",10000, 2000, 0.2)
        return account
    }else{
        account = new SavingsAccont("654259",10000, 0.2)
        return account
    }
    
}
}


class CurrentAccount extends Account {
    overdraftLimit = 0;
    overdraftInterset = 0;
    constructor(accountNumber, balance, overdraftLimit, overdraftInterest) {
        super(accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
        this.overdraftInterest = overdraftInterest;
    }
    calculateInterest() {
        if (this.balance < 0) {
            const interest = Math.abs(this.balance) * this.overdraftInterest;
            console.log(`คำนวณดอกเบี้ยเงินที่เกิน: ${interest}`);
            return interest;
        } else {
            console.log(`ไม่มีดอกเบี้ยเนื่องจากยอดคงเหลือไม่ติดลบ`);
            return 0;
        }
    }

    getOverdraftLimit() {
        return this.overdraftLimit;
    }
    setOverdraftLimit(overdraftLimit) {
        this.overdraftLimit = overdraftLimit;
    }
}

class SavingAccount extends Account {
    interestRate = 0;
    constructor(accountNumber, balance, interestRate) {
        super(accountNumber, balance);
        this.interestRate = interestRate;
    }
    calculateInterest() {
        const interest = this.balance * this.interestRate;
        console.log(`คำนวณดอกเบี้ย: ${interest}`);
        return interest;
    }
    getInterestRate() {
        return this.interestRate;
    }
    setInterestRate(interestRate) {
        this.interestRate = interestRate;
    }
}

class Transaction {
    transactionid = "";
    transactionType = "";
    amount = 0;
    transactionDate = "";
    status = "";
    constructor(transactionid, transactionType, amount, transactionDate, status) {
      this.transactionid = transactionid;
      this.transactionType = transactionType;
      this.amount = amount;
      this.transactionDate = transactionDate;
      this.status = status;
    }
    getTransactionId() {
        return this.transactionId;
    }
    getTransactionType() {
        return this.transactionType;
    }
    getAmount() {
        return this.amount;
    }

    getTransactionDate() {
        return this.transactionDate;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
    setTransactionType(transactionType) {
        this.transactionType = transactionType;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    setTransactionDate(transactionDate) {
        this.transactionDate = transactionDate;
    }
}

class ATM {
    location = "";
    mangedBy ="";
    constructor(location, mangedBy){
        this.location =location;
        this.mangedBy =mangedBy;
    }
    identify() {
        console.log("กำลังระบุตัวตนผู้ใช้");
    }

    checkBalance(account) {
        console.log(`ตรวจสอบเงินคงเหลือ ${account.accountNumber}`);
        return account.getBalance();
    }
    withdraw(account, amount) {
        console.log(`ถอนเงิน ${amount} จากบัญชี ${account.accountNumber}`);
        account.withdraw(amount);
    }

    deposit(account, amount) {
        console.log(`ฝากเงิน ${amount} ไปยังบัญชี ${account.accountNumber}`);
        account.deposit(amount);
    }

    changePin() {
        console.log("เปลี่ยนรหัส");
    }
    transfer() {
        console.log("");
    }

    verify() {
        console.log("");
    }
}
const main = () => {
    //lihk'ธนาคาร
    const bank = new Bank('SeNPRU', 'NPRU', '1111');

    //สร้างลุกค้้า
    const customer = new Customer('Ohm', 'นครปฐม', '0000000000', '654259006@webmail.npru.ac.th');

    // สร้างบัญชี
    const account = bank.createAccount("ออมทรัพย์", 700);


    // โชว์ข้อมูลลูกค้า
    console.log(customer.toString());


    // เพิ้มบัยชีให้กับลุกค้า
    customer.createAccount(account);

    // การฝาก doposit
    account.deposit(200);
    // การถอน with
    account.withdraw(100);

    // Display account balance
    console.log(`ยอดเงินคงเหลือ: ${account.getBalance()}`);
}
main();