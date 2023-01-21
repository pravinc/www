// https://flaviocopes.com/form-events/

// https://groww.in/calculators/rd-calculator
// https://www.hdfcbank.com/personal/tools-and-calculators/rd-calculator
function calculate_interest(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    let print_elem = document.getElementById("print_parent");

    let instalment_premium = parseInt(document.getElementById("instalment_premium").value);
    let interest_rate = parseInt(document.getElementById("interest_percentage").value);
    let compound_period_months = parseInt(document.getElementById("compound_period_months").value);
    let tenure_months = parseInt(document.getElementById("tenure_months").value);
    let paying_term = parseInt(document.getElementById("paying_term").value);
    let premium_frequency = parseInt(document.getElementById("premium_frequency").value);

    let monthly_stmt_html = '<table> \
                                <tr> \
                                <th id="month">Month</th> \
                                <th id="month">Deposit</th> \
                                <th id="interest">Interest</th> \
                                <th id="total">Total</th> \
                                </tr>';
    let invested_amount = 0;
    let curr_principal = 0;
    let last_interest_month = 0;
    let last_principal = 0;
    let deposits = [];
    for (let month_idx = 0; month_idx <= tenure_months; month_idx += 1)
    {
        if ((month_idx - last_interest_month) == compound_period_months)
        {
            total_interest = (last_principal * compound_period_months * interest_rate) / (12 * 100);

            for (let i = 0; i < deposits.length; i++) {
                interest = (instalment_premium * (month_idx - deposits[i]) * interest_rate) / (12 * 100);
                console.log(`CurrMonth: ${month_idx}, Deposit: ${instalment_premium.toFixed(2)}, DepositMonth: ${deposits[i]}, Interest: ${interest.toFixed(2)}`);
                total_interest += interest;
            }
            deposits = [];

            curr_principal += total_interest;
            console.log(`Month: ${month_idx}, Interest: ${total_interest.toFixed(2)}, Balance: ${curr_principal.toFixed(2)}`);
            monthly_stmt_html += `<tr><td>${month_idx}</td><td>NA</td><td>${total_interest.toFixed(2)}</td><td>${curr_principal.toFixed(2)}</td></tr>`;

            last_interest_month = month_idx;
            last_principal = curr_principal;
        }

        if (month_idx < paying_term)
        {
            if (month_idx % premium_frequency == 0)
            {
                invested_amount += instalment_premium;
                curr_principal += instalment_premium;
                deposits.push(month_idx);
                monthly_stmt_html += `<tr><td>${month_idx}</td><td>${instalment_premium.toFixed(2)}</td><td>NA</td><td>${curr_principal.toFixed(2)}</td></tr>`;
            }
        }
    }
    monthly_stmt_html += '</table>';

    console.log(`\nAfter ${tenure_months} months, total balance is ${curr_principal.toFixed(2)}`);

    final_summary = `<p>InvestedAmount: ${invested_amount}<br>Months: ${tenure_months}<br>FinalAmount: ${curr_principal.toFixed(2)}</p>`;
    print_elem.innerHTML = final_summary + monthly_stmt_html;
}

