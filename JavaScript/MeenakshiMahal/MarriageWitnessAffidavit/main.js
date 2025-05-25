document.getElementById('marriageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const bridegroom = document.getElementById('bridegroom').value.trim();
    const bride = document.getElementById('bride').value.trim();
    const date = document.getElementById('date').value;
    if (!bridegroom || !bride || !date) return;
    const formattedDate = new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    // English letter
    const letterEn = `
        <p>To Whom It May Concern,</p>
        <p>This is to certify that <strong>${bridegroom}</strong> and <strong>${bride}</strong> were united in marriage at <strong>Meenakshi Mahal</strong> on <strong>${formattedDate}</strong>.</p>
        <p>This letter is issued upon their request for whatever purpose it may serve.</p>
        <br>
        <p>Sincerely,<br>Meenakshi Mahal Administration</p>
    `;
    // Tamil letter
    const letterTa = `
        <p>யாருக்கு இது தொடர்புடையதோ,</p>
        <p><strong>${bridegroom}</strong> மற்றும் <strong>${bride}</strong> ஆகியோர் <strong>${formattedDate}</strong> அன்று <strong>மீனாட்சி மஹால்</strong> இல் திருமணம் செய்து கொண்டனர் என்பதை இத்தால் உறுதிப்படுத்துகிறோம்.</p>
        <p>இக்கடிதம் அவர்களின் கோரிக்கைப்படி வழங்கப்படுகிறது.</p>
        <br>
        <p>மரியாதையுடன்,<br>மீனாட்சி மஹால் நிர்வாகம்</p>
    `;
    document.getElementById('letter').innerHTML = `
        <div style="margin-bottom:32px;">${letterEn}</div>
        <hr style="margin:24px 0;">
        <div style="font-family:'Latha', 'Noto Sans Tamil', Arial, sans-serif;">${letterTa}</div>
    `;
    document.getElementById('printBtn').style.display = 'inline-block';
});

document.getElementById('printBtn').addEventListener('click', function() {
    const printContents = document.getElementById('letter').innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write('<html><head><title>Marriage Proof Letter</title>');
    win.document.write('<style>body{font-family:Arial,sans-serif;margin:40px;}p{margin:16px 0;}</style>');
    win.document.write('</head><body>');
    // Add empty lines for letterhead space
    win.document.write('<div style="height:120px;"></div>');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
});
