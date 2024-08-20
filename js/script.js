function showExercise(exerciseNumber) {
    const exercises = document.querySelectorAll('.exercise');
    exercises.forEach(exercise => exercise.classList.remove('active'));

    const buttons = document.querySelectorAll('.sidebar-btn');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(`exercise${exerciseNumber}`).classList.add('active');
    buttons[exerciseNumber - 1].classList.add('active');
}

function calculateEnrollment() {
    const diemChuan = parseFloat(document.getElementById('diemChuan').value);
    const khuVuc = parseInt(document.getElementById('khuVucButton').getAttribute('data-value'), 10);
    const doiTuong = parseInt(document.getElementById('doiTuongButton').getAttribute('data-value'), 10);
    const mon1 = parseFloat(document.getElementById('mon1').value);
    const mon2 = parseFloat(document.getElementById('mon2').value);
    const mon3 = parseFloat(document.getElementById('mon3').value);

    const enrollmentResultDiv = document.getElementById('enrollmentResult');
    enrollmentResultDiv.textContent = '';

    if (
        isNaN(diemChuan) || diemChuan < 0 ||
        isNaN(khuVuc) || khuVuc < 0 ||
        isNaN(doiTuong) || doiTuong < 0 ||
        isNaN(mon1) || mon1 < 0 || mon1 > 10 ||
        isNaN(mon2) || mon2 < 0 || mon2 > 10 ||
        isNaN(mon3) || mon3 < 0 || mon3 > 10
    ) {
        enrollmentResultDiv.textContent = 'Vui lòng nhập các giá trị hợp lệ.';
        return;
    }

    const totalScore = mon1 + mon2 + mon3 + khuVuc + doiTuong;
    if (totalScore >= diemChuan) {
        enrollmentResultDiv.textContent = `Tổng điểm: ${totalScore}. Chúc mừng! Bạn đã đậu.`;
    } else {
        enrollmentResultDiv.textContent = `Tổng điểm: ${totalScore}. Rất tiếc! Bạn không đậu.`;
    }
}

function calculateElectricityBill() {
    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value);

    const electricityResultDiv = document.getElementById('electricityResult');
    electricityResultDiv.textContent = '';

    if (isNaN(electricityUsage) || electricityUsage < 0) {
        electricityResultDiv.textContent = 'Vui lòng nhập số kWh hợp lệ.';
        return;
    }

    let bill = 0;
    if (electricityUsage <= 50) {
        bill = electricityUsage * 1678;
    } else if (electricityUsage <= 100) {
        bill = 50 * 1678 + (electricityUsage - 50) * 1734;
    } else if (electricityUsage <= 200) {
        bill = 50 * 1678 + 50 * 1734 + (electricityUsage - 100) * 2014;
    } else if (electricityUsage <= 300) {
        bill = 50 * 1678 + 50 * 1734 + 100 * 2014 + (electricityUsage - 200) * 2536;
    } else if (electricityUsage <= 400) {
        bill = 50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + (electricityUsage - 300) * 2834;
    } else {
        bill = 50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + 100 * 2834 + (electricityUsage - 400) * 2927;
    }

    electricityResultDiv.textContent = `Tiền điện phải trả là: ${bill.toLocaleString('vn-VN')} VND.`;
}

function calculateIncomeTax() {
    const fullName = document.getElementById('fullName').value;
    const totalIncome = parseFloat(document.getElementById('totalIncome').value);
    const dependents = parseInt(document.getElementById('dependents').value, 10);

    const taxResultDiv = document.getElementById('taxResult');
    taxResultDiv.textContent = '';

    if (isNaN(totalIncome) || isNaN(dependents) || totalIncome < 0 || dependents < 0) {
        taxResultDiv.textContent = 'Vui lòng nhập các giá trị hợp lệ.';
        return;
    }

    const taxableIncome = totalIncome - 4000000 - (dependents * 1600000);
    let tax = 0;

    if (taxableIncome <= 60000000) {
        tax = taxableIncome * 0.05;
    } else if (taxableIncome <= 120000000) {
        tax = (taxableIncome - 60000000) * 0.1 + 3000000;
    } else if (taxableIncome <= 210000000) {
        tax = (taxableIncome - 120000000) * 0.15 + 9000000;
    } else if (taxableIncome <= 384000000) {
        tax = (taxableIncome - 210000000) * 0.2 + 22500000;
    } else if (taxableIncome <= 624000000) {
        tax = (taxableIncome - 384000000) * 0.25 + 58500000;
    } else if (taxableIncome <= 960000000) {
        tax = (taxableIncome - 624000000) * 0.3 + 118500000;
    } else {
        tax = (taxableIncome - 960000000) * 0.35 + 214500000;
    }

    taxResultDiv.textContent = `Họ tên: ${fullName}\nThuế thu nhập cá nhân phải nộp là: ${tax.toLocaleString('vn-VN')} VND.`;
}

function toggleConnectionField() {
    const customerType = document.getElementById('customerType').value;
    const connectionsInput = document.getElementById('connections');
    if (customerType === 'business') {
        connectionsInput.style.display = 'block';
    } else {
        connectionsInput.style.display = 'none';
    }
}

function calculateCableBill() {
    const customerType = document.getElementById('customerType').value;
    const premiumChannels = parseInt(document.getElementById('premiumChannels').value, 10);
    const connections = parseInt(document.getElementById('connections').value, 10);

    const cableResultDiv = document.getElementById('cableResult');
    cableResultDiv.textContent = '';

    if (isNaN(premiumChannels) || premiumChannels < 0 || (customerType === 'business' && (isNaN(connections) || connections < 0))) {
        cableResultDiv.textContent = 'Vui lòng nhập các giá trị hợp lệ.';
        return;
    }

    let totalBill = 0;

    if (customerType === 'residential') {
        totalBill = 4.5 + 20.5 + (7.5 * premiumChannels);
    } else if (customerType === 'business') {
        const baseFee = 75;
        const additionalConnectionFee = connections > 10 ? (connections - 10) * 5 : 0;
        totalBill = 15 + baseFee + additionalConnectionFee + (50 * premiumChannels);
    }

    cableResultDiv.textContent = `Tổng hóa đơn tiền cáp là: $${totalBill.toFixed(2)}.`;
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function selectKhuVuc(value, text) {
    document.getElementById('khuVucButton').innerText = text;
    document.getElementById('khuVucButton').setAttribute('data-value', value);
    closeModal('khuVucModal');
}

function selectDoiTuong(value, text) {
    document.getElementById('doiTuongButton').innerText = text;
    document.getElementById('doiTuongButton').setAttribute('data-value', value);
    closeModal('doiTuongModal');
}
