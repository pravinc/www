// https://flaviocopes.com/form-events/

function on_submit(event) {
    event.preventDefault();

    let print_elem = document.getElementById("print_container");

    let loan_amount = parseInt(document.getElementById("loan_amount").value);
    let loan_date = document.getElementById("loan_date").valueAsDate;
    // loan_date.getFullYear(), loan_date.getMonth(), loan_date.getDate()
    const today_date = new Date();
    today_date.setHours(0, 0, 0, 0);
    let payment_date = document.getElementById("payment_date").valueAsDate;
    // ✅ Reset a Date's time to midnight
    let tenure_days = calculate_days_between(loan_date, payment_date);
    let interest = calculate_interest(loan_amount, tenure_days);
    let final_due_amount = loan_amount + interest;

    // let monthly_stmt_html = '<table> \
    //                             <tr> \
    //                             <th id="month">Month</th> \
    //                             <th id="interest">Interest</th> \
    //                             <th id="total">Total</th> \
    //                             </tr>';
    // let curr_principal = initial_principal;
    // for (let month_idx = 0; month_idx < tenure_months; ++month_idx)
    // {
    //     interest = (curr_principal * 1 * interest_rate) / (12 * 100);
    //     curr_principal += interest;
    //     console.log(`Month: ${month_idx}, Interest: ${interest.toFixed(2)}, Balance: ${curr_principal.toFixed(2)}`);
    //     monthly_stmt_html += `<tr><td>${month_idx + 1}</td><td>${interest.toFixed(2)}</td><td>${curr_principal.toFixed(2)}</td></tr>`;
    // }
    // monthly_stmt_html += '</table>';

    // console.log(`\nAfter ${tenure_months} months, total balance is ${curr_principal.toFixed(2)}`);

    final_summary = `<p>LoanAmount: ${loan_amount}<br>LoanDate: ${formatDate(loan_date)}<br>PaymentDate: ${formatDate(payment_date)}<br>LoanTenureInDays: ${tenure_days}<br>Interest: ${interest.toFixed(2)}<br>FinalDueAmount: ${final_due_amount.toFixed(2)}</p>`;
    print_elem.innerHTML = final_summary;
}

function calculate_days_between(start_date, end_date)
{
    const one_day = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // const firstDate = new Date(2008, 1, 12);
    // const secondDate = new Date(2008, 1, 22);

    const diff_in_days = Math.round(Math.abs((end_date - start_date) / one_day));

    return diff_in_days + 1
}

function calculate_interest(loan_amount, loan_tenure_days)
{
    if (loan_tenure_days <= 5)
    {
        return (loan_amount / 100) * 0.5;
    }
    else if (loan_tenure_days <= 16)
    {
        return (loan_amount / 100) * 1.0;
    }
    else
    {
        let interest_rate = get_interest_rate_by_tenure(loan_tenure_days);
        let interest = simple_interest(loan_amount, loan_tenure_days, interest_rate);
        return interest;
    }
}

function get_interest_rate_by_tenure(loan_tenure_days)
{
    if (loan_tenure_days <= 100)
    {
        return 21;
    }
    else if (loan_tenure_days <= 200)
    {
        return 22;
    }
    else if (loan_tenure_days <= 300)
    {
        return 23;
    }
    else if (loan_tenure_days <= 400)
    {
        return 24;
    }
    else if (loan_tenure_days <= 500)
    {
        return 25;
    }
    else if (loan_tenure_days <= 600)
    {
        return 26;
    }
    else /* 601 to 1000 */
    {
        return 27;
    }
}

function simple_interest(loan_amount, loan_tenure_days, interest_rate)
{
    return (loan_amount * loan_tenure_days * interest_rate) / (365 * 100);
}

// ✅ Format a date to YYYY-MM-DD (or any other format)
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}
