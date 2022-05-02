// https://flaviocopes.com/form-events/

function calculate_interest(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    let print_elem = document.getElementById("print_parent");

    let initial_principal = parseInt(document.getElementById("initial_principal").value);
    let interest_rate = 12;
    let tenure_months = parseInt(document.getElementById("tenure_months").value);

    let monthly_stmt_html = '<table> \
                                <tr> \
                                <th id="month">Month</th> \
                                <th id="interest">Interest</th> \
                                <th id="total">Total</th> \
                                </tr>';
    let curr_principal = initial_principal;
    for (let month_idx = 0; month_idx < tenure_months; ++month_idx)
    {
        interest = (curr_principal * 1 * interest_rate) / (12 * 100);
        curr_principal += interest;
        console.log(`Month: ${month_idx}, Interest: ${interest.toFixed(2)}, Balance: ${curr_principal.toFixed(2)}`);
        monthly_stmt_html += `<tr><td>${month_idx + 1}</td><td>${interest.toFixed(2)}</td><td>${curr_principal.toFixed(2)}</td></tr>`;
    }
    monthly_stmt_html += '</table>';

    console.log(`\nAfter ${tenure_months} months, total balance is ${curr_principal.toFixed(2)}`);

    final_summary = `<p>InitialAmount: ${initial_principal}<br>Months: ${tenure_months}<br>FinalAmount: ${curr_principal.toFixed(2)}</p>`;
    print_elem.innerHTML = final_summary + monthly_stmt_html;
}

