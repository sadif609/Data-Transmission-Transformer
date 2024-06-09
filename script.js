// IPv4 to Binary Conversion
function ipv4ToBinary() {
    const ip = document.getElementById('ipv4Input').value;
    if (isValidIPv4(ip)) {
        document.getElementById('ipv4ToBinaryResult').innerText = `Binary IP: ${ipToBinary(ip)}`;
    } else {
        document.getElementById('ipv4ToBinaryResult').innerText = 'Invalid IPv4 address!';
    }
}

function isValidIPv4(ip) {
    const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(ip);
}

function ipToBinary(ip) {
    return ip.split('.').map(num => ('00000000' + parseInt(num, 10).toString(2)).slice(-8)).join('');
}

// Binary to IPv4 Conversion
function binaryToIpv4() {
    const binaryIp = document.getElementById('binaryIpInput').value;
    if (binaryIp.length === 32) {
        document.getElementById('binaryToIpv4Result').innerText = `IPv4 address: ${binaryToIp(binaryIp)}`;
    } else {
        document.getElementById('binaryToIpv4Result').innerText = 'Invalid binary IP address!';
    }
}

function binaryToIp(binaryIp) {
    return binaryIp.match(/.{8}/g).map(byte => parseInt(byte, 2)).join('.');
}

// Bit Stuffing
function bitStuffing() {
    const data = document.getElementById('bitInput').value;
    const flag = document.getElementById('bitFlag').value;
    const stuffed = bitStuffingProcess(data, flag);
    document.getElementById('bitStuffingResult').innerText = `Stuffed Data: ${stuffed}`;
    document.getElementById('bitDestuffingResult').innerText = `Destuffed Data: ${bitDestuffingProcess(stuffed, flag)}`;
}

function bitStuffingProcess(data, flag) {
    let outputB = flag + ' ';
    let k = 0;
    for (let c of data) {
        outputB += c;
        if (c === '1') {
            k++;
            if (k === 5) {
                outputB += '0';
                k = 0;
            }
        } else {
            k = 0;
        }
    }
    outputB += ' ' + flag;
    return outputB;
}

function bitDestuffingProcess(data, flag) {
    let outputB = '';
    let ax = data.slice(flag.length + 1, -(flag.length + 1));
    let k = 0;
    let stuffed = false;

    for (let c of ax) {
        if (stuffed) {
            if (c === '0') {
                outputB += '1';
                stuffed = false;
            } else {
                outputB += c;
                k = 0;
            }
        } else {
            outputB += c;
            if (c === '1') {
                k++;
                if (k === 5) {
                    stuffed = true;
                    k = 0;
                }
            } else {
                k = 0;
            }
        }
    }
    return outputB;
}

// Character Stuffing
function charStuffing() {
    const data = document.getElementById('charInput').value;
    const flag = document.getElementById('charFlag').value;
    const escapeChar = document.getElementById('charEscape').value;
    const stuffed = charStuffingProcess(data, flag, escapeChar);
    document.getElementById('charStuffingResult').innerText = `Stuffed Data: ${stuffed}`;
    document.getElementById('charDestuffingResult').innerText = `Destuffed Data: ${charDestuffingProcess(stuffed, flag, escapeChar)}`;
}

function charStuffingProcess(data, flag, escapeChar) {
    let stuffedOutput = flag;
    for (let c of data) {
        if (c === flag || c === escapeChar) {
            stuffedOutput += escapeChar;
        }
        stuffedOutput += c;
    }
    stuffedOutput += flag;
    return stuffedOutput;
}

function charDestuffingProcess(data, flag, escapeChar) {
    let destuffedOutput = '';
    let pos = flag.length;
    let end = data.length - flag.length;
    while (pos < end) {
        if (data.substr(pos, escapeChar.length) === escapeChar) {
            pos += escapeChar.length;
            destuffedOutput += data[pos++];
        } else {
            destuffedOutput += data[pos++];
        }
    }
    return destuffedOutput;
}

// Checksum Calculation
function calculateChecksum() {
    const data = document.getElementById('checksumInput').value;
    const checksum = calculateChecksumProcess(data);
    document.getElementById('checksumResult').innerText = `Checksum: ${checksum}`;
}

function calculateChecksumProcess(data) {
    const asciiSum = [...data].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return asciiSum;
}

function receiveData() {
    const data = document.getElementById('checksumInput').value;
    const checksum = parseInt(prompt('Enter received checksum:'));
    const calculatedChecksum = calculateChecksumProcess(data);
    const receivedDataResult = document.getElementById('receivedDataResult');
    if (checksum === calculatedChecksum) {
        receivedDataResult.innerText = `Received Data: ${data} (Checksum is correct. Data is intact.)`;
    } else {
        receivedDataResult.innerText = `Received Data: ${data} (Checksum is incorrect. Data may be corrupted.)`;
    }
}
