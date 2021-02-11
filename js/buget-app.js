class UI{
    constructor(){
        this.incomeFeedback = document.querySelector('.income-feedback');
        this.expenseFeedback = document.querySelector('.expense-feedback');

        this.incomeForm = document.querySelector('#income-form');
        this.expenseForm = document.querySelector('#expense-form');

        this.incomeAmount = document.querySelector('#income-input');
        this.incomeReason = document.querySelector('#income-reason');

        this.expenseAmount = document.querySelector('#expense-input');
        this.expenseReason = document.querySelector('#expense-reason');

        this.incomeList = document.querySelector('.income-list');
        this.expenseList = document.querySelector('.expense-list');

        this.totalIncome = document.querySelector('#total-income');
        this.totalExpence = document.querySelector('#total-expence');
        this.balance = document.querySelector('#balance');

        this.incomeListArray = [];
        this.itemId = 0;
        this.counterIncome = 0;
    }

    displayFeedback(element, message){

            // this.incomeFeedback.classList.remove('hide');
            // this.incomeFeedback.innerHTML = message;
            element.classList.remove('hide');
            element.innerHtml = message;
           // const self = this;
            setTimeout(()=>{
                // this.incomeFeedback.classList.add('hide');
                element.classList.add('hide');
            });
    }

    submitIncomeForm(){
        let income = this.incomeAmount.value.trim();
        console.log(income);
        let incomeMessage = this.incomeReason.value.trim();
        let totalIncomeNumber = parseInt(this.totalIncome.textContent);
        if(income < 0 || income === ''){
            this.displayFeedback(this.incomeFeedback, "Write a valid income amount");
        }else{
            if(incomeMessage.length < 1){
                this.displayFeedback(this.incomeFeedback, "Write a reason for income amount");
            }else{
                // add income to income list
                this.incomeList.innerHTML = `<h5 class="income-item"><span><b>${income}</b></span> <span>${incomeMessage} </span></h5><div class="income-icons"><a href="#" data-id="{income.id}"><i class="fas fa-edit"></i>Edit</a><a href="#" data-id="{income.id}"><i class="fas fa-trash"></i>Delete</a></div>`;
                // recalculate Total Income
                this.totalIncome.innerHTML = totalIncomeNumber + parseInt(income);
                // recalculate Balance
                this.recalculateBalance();
                // clear income form
                this.incomeAmount.value = '';
                this.incomeReason.value = '';
            }
        }
    }

    recalculateBalance(){
        let balanceNumber = parseInt(this.balance.textContent);
        balanceNumber = parseInt(this.totalIncome.textContent) - parseInt(this.totalExpence.textContent);
        this.balance.innerHTML = balanceNumber;
        if(balanceNumber < 0){
            this.balance.classList.remove('showGreen', 'showGray');
            this.balance.classList.add('showRed');
        }else if(balanceNumber > 0){
            this.balance.classList.remove('showRed', 'showGray');
            this.balance.classList.add('showGreen');
        } else{
            this.balance.classList.remove('showGreen', 'showRed');
            this.balance.classList.add('showGray');
        }
    }

    submitExpenseForm(){
        let expenseValue = this.expenseAmount.value.trim();
        let expenseReason = this.expenseReason.value.trim();
        let totalExpenseNumber = parseInt(this.totalExpence.textContent);

        if (expenseValue === '' || isNaN(expenseValue) || parseInt(expenseValue) < 0){
            this.displayFeedback(this.expenseFeedback, "Write a valid expense amount");
        }
        if(expenseReason ==='' || expenseReason.length < 3){
            this.displayFeedback(this.expenseFeedback, "Write a valid reason for expense");
        }
        this.expenseList.innerHTML = `<p>${totalExpenseNumber + parseInt(expenseValue)} ${expenseReason}</p>`;
        this.totalExpence.innerHTML =  parseInt(expenseValue);
                

        this.recalculateBalance();
        this.expenseAmount.value='';
        this.expenseReason.value = '';
    }

    editIncome(){

    }

    deleteIncome(){

    }
}

function eventListner(){
    const incomeForm = document.getElementById("income-form");
    const expenseForm = document.getElementById("expenses-form");
    console.log(expenseForm);

    //const incomeList = document.getElementById("");
    const ui = new UI();

    incomeForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitIncomeForm();
    });

    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseForm();
    });
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("Start");
    eventListner();
});