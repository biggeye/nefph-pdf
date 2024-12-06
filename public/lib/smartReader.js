var PROTOCEL_FLAG = {
    _reader_cmd_STX: 165, //Head
    _reader_cmd_ETX: 213, //End
}

/**
 * Reader Command
 */
var READER_CMD = {
    _reader_server_connect: 5, // Connect Service
    _reader_server_close: 6, // Disconnect Service
    _reader_cmd_connect: 10, // Connect Reader
    _reader_cmd_disconnect: 11, // Disconnect Reader
    _reader_cmd_read_ver: 12, // Read Hardware Version
    _reader_cmd_read_snr: 13, // Read Product Serial Number
    _reader_cmd_beep: 14, // Beep
    _reader_cmd_set_baud: 15, // Set serial port baud rate
    _reader_cmd_get_status: 16, // Get the status of user card seat
    _reader_cmd_write_eeprom: 17, // Write EEPROM
    _reader_cmd_read_eeprom: 18, // Read EEPROM
    _reader_cmd_set_number: 19, // Set Reader number
    _reader_cmd_get_number: 20, // Get Reader number
    _reader_cmd_turn_on: 21, // Power on of contact card slot
    _reader_cmd_turn_off: 22, // Power off of contact card slot
    _reader_cmd_rf_reset: 23, // RF reset
    _reader_cmd_select_protocol: 24, // Select Protocol

    _reader_cmd_rf_card: 50, // TypeA Activate 
    _reader_cmd_rf_halt: 51, // TypeA Halt
    _reader_cmd_rf_card_b: 52, // Activate TypeB
    _reader_cmd_rf_halt_b: 53, // Halt TypeB
    _reader_cmd_m_auth_key: 54, // S50/S70 Authentication
    _reader_cmd_m_write: 55, // S50/S70 Write Data
    _reader_cmd_m_read: 56, // S50/S70 Read Data
    _reader_cmd_m_init_value: 57, // S50/S70 Initialize Value
    _reader_cmd_m_read_value: 58, // S50/S70 Read Value
    _reader_cmd_m_increment_value: 59, // S50/S70 Increment
    _reader_cmd_m_decrement_value: 60, // S50/S70 Decrement

    _reader_cmd_c_cpu_reset: 65, // Contactless CPU Card Reset TypeA
    _reader_cmd_c_cpu_reset_b: 66, // Contactless CPU Card Reset TypeB
    _reader_cmd_c_cpu_Transmit: 67, // Contactless CPU Card Transmit Command TypeA/B

    _reader_cmd_uc_auth_key: 70, // Ultralight C Authentication
    _reader_cmd_uev_auth_key: 71, // ultralight EV Authentication
    _reader_cmd_u_read: 72, // Ultralight/C Read Data
    _reader_cmd_u_write: 73, // Ultralight/C Write Data
    _reader_cmd_uc_change_key: 74, // Ultralight C Change Key

    _reader_cmd_ntag_auth_pwd: 80, // NTAG Authentication
    _reader_cmd_ntag_read: 81, // NTAG Read Data
    _reader_cmd_ntag_write: 82, // NTAG Write Data
    _reader_cmd_ntag_counter: 83, // NTAG Read Counter
    _reader_cmd_ntag_version: 84, // NTAG Read Version
    _reader_cmd_ntag_sig: 85, // NTAG Read Signature

    _reader_cmd_icode2_set_mode: 100, // Set data exchange mode
    _reader_cmd_icode2_inventory: 101, // ICODE2 Inventory, returns dsfid and uid of card.
    _reader_cmd_icode2_select: 102, // ICODE2 Set to Select State 
    _reader_cmd_icode2_reset_to_ready: 103, // ICODE2 Set to Ready State
    _reader_cmd_icode2_to_quiet: 104, // ICODE2 Set to Quiet State
    _reader_cmd_icode2_read: 105, // ICODE2 Read multiple block data
    _reader_cmd_icode2_write: 106, // ICODE2 Read multiple block data
    _reader_cmd_icode2_write_afi: 107, // ICODE2 Write AFI
    _reader_cmd_icode2_write_dsfid: 108, // ICODE2 Write DSFID
    _reader_cmd_icode2_set_eas: 109, // ICODE2 Set EAS
    _reader_cmd_icode2_lock: 110, // ICODE2 Lock Block
    _reader_cmd_icode2_lock_afi: 111, // ICODE2 Lock AFI
    _reader_cmd_icode2_lock_dsfid: 112, // ICODE2 Lock DSFID
    _reader_cmd_icode2_lock_eas: 113, // ICODE2 Lock EAS
    _reader_cmd_icode2_get_mulblock_security: 114, //ICODE2 Read multiple block security Info
    _reader_cmd_icode2_get_sysinfo: 115, //ICODE2 Get System Info

    _reader_cmd_uhf_inventory: 120, // UHF Inventory
    _reader_cmd_uhf_select_mode: 121, // UHF Set Select Mode
    _reader_cmd_uhf_select: 122, // UHF Select Tag
    _reader_cmd_uhf_read: 123, // UHF Read
    _reader_cmd_uhf_write: 124, // UHF Write
    _reader_cmd_uhf_lock_unlock: 125, // UHF Lock or Unlock
    _reader_cmd_uhf_kill: 126, // UHF Kill
    _reader_cmd_uhf_set_region: 127, // UHF Set Region
    _reader_cmd_uhf_set_channel: 128, // UHF Set Channel
    _reader_cmd_uhf_get_channel: 129, // UHF Get Channel
    _reader_cmd_uhf_set_fhss: 130, // UHF Set FHSS
    _reader_cmd_uhf_set_papower: 131, // UHF Set PA Power
    _reader_cmd_uhf_get_papower: 132, // UHF Get PA Power
    _reader_cmd_uhf_set_cw: 133, // UHF Set Carrier Wave
    _reader_cmd_uhf_set_modem: 134, // UHF Set Modem Parameter
    _reader_cmd_uhf_get_modem: 135, // UHF Get Modem Parameter

    _reader_cmd_lf_set_datarate: 150, // LF Set data rate
    _reader_cmd_lf_open_mod: 151, // Turn on 125kHz RF signal
    _reader_cmd_lf_close_mod: 152, // Turn off 125kHz RF signal
    _reader_cmd_t5557_write_free: 153, // Write data to T5557 card (no encryption)
    _reader_cmd_t5557_write_pwd: 154, // Write data to T5557 card (encryption)
    _reader_cmd_t5557_read_direct: 155, // T5557 card Read Data
    _reader_cmd_t5557_aor: 156, // Wake up AOR mode encryption T5557 card
    _reader_cmd_t5557_to_id: 157, // Convert a T5557 card to an ID card
    _reader_cmd_id_restore_t5557: 158, // Restored to T5557 card
    _reader_cmd_em_read: 159, // Read EM4001 or compatible card data
    _reader_cmd_em4305_write: 160, // EM4305 Write Data
    _reader_cmd_em4305_read_biphase: 161, // EM4305 Read Data
    _reader_cmd_em4305_read_manchester: 162, // EM4305 Read Data
    _reader_cmd_em4305_login: 163, //EM4305 Login
    _reader_cmd_em4305_protect: 164, // EM4305 Protect
    _reader_cmd_em4305_disable: 165, // EM4305 Disable 
    _reader_cmd_em4305_set_mode: 166, // Set EM Type
    _reader_cmd_em4305_to_id: 167, // Convert a EM4305 card to an ID card
    _reader_cmd_em4305_to_fdxb: 168, // Convert a T5557 card to an FDX_B card

    _reader_cmd_cpu_reset: 200, // Connect CPU Reset
    _reader_cmd_cpu_transmit: 201, // Contact CPU Card Transmit Command
    _reader_cmd_cpu_set_baud: 202, // Contact CPU Card Set Baud

    _reader_cmd_24c_write: 205, // AT24CXX Write Data
    _reader_cmd_24c_read: 206, // AT24CXX Read Data
    _reader_cmd_45D041_write: 207, // AT45D041 Write Data
    _reader_cmd_45D041_read: 208, // AT45D041 Read Data

    _reader_cmd_4442_read: 210, // SLE4442 Read Data
    _reader_cmd_4442_write: 211, // SLE4442 Write Data
    _reader_cmd_4442_verify_sc: 212, // SLE4442 Verify SC
    _reader_cmd_4442_change_sc: 213, // SLE4442 Change SC
    _reader_cmd_4442_read_sc: 214, // SLE4442 Read SC
    _reader_cmd_4442_read_counter: 215, // SLE4442 Read Counter
    _reader_cmd_4442_read_pro_bit: 216, // SLE4442 Read Protect
    _reader_cmd_4442_protect: 217, // SLE4442 Protect Data

    _reader_cmd_4428_read: 220, // SLE4428 Read Data
    _reader_cmd_4428_write: 221, // SLE4428 Write Data
    _reader_cmd_4428_verify_sc: 222, // SLE4428 Verify SC
    _reader_cmd_4428_change_sc: 223, // SLE4428 Change SC
    _reader_cmd_4428_read_sc: 224, // SLE4428 Read SC
    _reader_cmd_4428_read_counter: 225, // SLE4428 Read Counter
    _reader_cmd_4428_read_pro: 226, // SLE4428 Read Data With Protect
    _reader_cmd_4428_write_pro: 227, // SLE4428 Write Data and Protect
    _reader_cmd_4428_protect: 228, // SLE4428 Product Data

    _reader_cmd_102_read: 230, // AT88SC102 Read Data
    _reader_cmd_102_write: 231, // AT88SC102 Write Data
    _reader_cmd_102_erase: 232, // AT88SC102 Erase Data
    _reader_cmd_102_verify_sc: 233, // AT88SC102 Verify SC
    _reader_cmd_102_change_sc: 234, // AT88SC102 Change SC
    _reader_cmd_102_read_sc: 235, // AT88SC102 Read SC
    _reader_cmd_102_read_sc_counter: 236, // AT88SC102 Read SC Counter
    _reader_cmd_102_verify_erase_key: 237, // AT88SC102 Verify Erase Key
    _reader_cmd_102_change_erase_key: 238, // AT88SC102 Change Erase Key
    _reader_cmd_102_read_erase_key: 239, // AT88SC102 Read Erase Key
    _reader_cmd_102_read_erase_counter: 240, // AT88SC102 Read Application Zone 2 Erase Counter
    _reader_cmd_102_PR_RD_clear: 241, // AT88SC102 PR/RD Clear
    _reader_cmd_102_simulate_psnl: 242, // AT88SC102 Simulate Personalization
    _reader_cmd_102_psnl: 243, // AT88SC102 Personalization

    _reader_cmd_1604_read: 250, // AT88SC1604 Read Data
    _reader_cmd_1604_write: 251, // AT88SC1604 Write Data
    _reader_cmd_1604_erase: 252, // AT88SC1604 Erase Data
    _reader_cmd_1604_verify_sc: 253, // AT88SC1604 Verify SC
    _reader_cmd_1604_change_sc: 254, // AT88SC1604 Change SC
    _reader_cmd_1604_read_sc: 255, // AT88SC1604 Read SC
    _reader_cmd_1604_read_sc_counter: 256, // AT88SC1604 Read SC Counter
    _reader_cmd_1604_verify_erase_key: 257, // AT88SC1608 Verify Erase Key
    _reader_cmd_1604_change_erase_key: 258, // AT88SC1604 Change Erase Key
    _reader_cmd_1604_read_erase_key: 259, // AT88SC1604 Read Erase Key
    _reader_cmd_1604_read_erase_key_counter: 260, // AT88SC1604 Read Erase Key Counter
    _reader_cmd_1604_PR_RD_clear: 261, // AT88SC1604 PR/RD Clear
    _reader_cmd_1604_simulate_psnl: 262, // AT88SC1604 Simulate Personalization
    _reader_cmd_1604_psnl: 263, // AT88SC1604 Personalization

    _reader_cmd_1608_reset: 270, // AT88SC1608 Reset
    _reader_cmd_1608_read_user: 271, // AT88SC1608 Read User Zone Data
    _reader_cmd_1608_write_user: 272, // AT88SC1608 Write User Zone Data
    _reader_cmd_1608_read_config: 273, // AT88SC1608 Read Config Zone Data
    _reader_cmd_1608_write_config: 274, // AT88SC1608 Write Config Zone Data
    _reader_cmd_1608_verify_pwd: 275, // AT88SC1608 Verify Password
    _reader_cmd_1608_change_pwd: 276, // AT88SC1608 Change Password
    _reader_cmd_1608_read_pwd: 277, // AT88SC1608 Read Password
    _reader_cmd_1608_read_pwd_counter: 278, // AT88SC1608 Read Password Counter
    _reader_cmd_1608_read_ar: 279, // AT88SC1608 Read AR
    _reader_cmd_1608_write_ar: 280, // AT88SC1608 Write AR
    _reader_cmd_1608_read_fuse: 281, // AT88SC1608 Read FUSE
    _reader_cmd_1608_psnl: 282, // AT88SC1608 Personalization

    _reader_cmd_153_reset: 290, // AT88SC153 Reset
    _reader_cmd_153_read_user: 291, // AT88SC153 Read User Zone Data
    _reader_cmd_153_write_user: 292, // AT88SC153 Write User Zone Data
    _reader_cmd_153_read_config: 293, // AT88SC153 Read Config Zone Data
    _reader_cmd_153_write_config: 294, // AT88SC153 Write Config Zone Data
    _reader_cmd_153_verify_pwd: 295, // AT88SC153 Verify Password
    _reader_cmd_153_change_pwd: 296, // AT88SC153 Change Password
    _reader_cmd_153_read_pwd: 297, // AT88SC153 Read Password
    _reader_cmd_153_read_pwd_counter: 298, // AT88SC153 Read Password Counter
    _reader_cmd_153_read_ar: 299, // AT88SC153 Read AR
    _reader_cmd_153_write_ar: 300, // AT88SC153 Write AR
    _reader_cmd_153_read_dcr: 301, // AT88SC153 Read DCR
    _reader_cmd_153_write_dcr: 302, // AT88SC153 Write DCR
    _reader_cmd_153_read_fuse: 303, // AT88SC153 Read FUSE
    _reader_cmd_153_write_fuse: 304, // AT88SC153 Write FUSE
    _reader_cmd_153_psnl: 305, // AT88SC153 Personalization

    _reader_cmd_mag_read: 500, // Read Magnetic Strip Card Data

}

var CONNECT_MODE = {
    _connect_mode_usb: 0, // USB connection, only one can be connected
    _connect_mode_usb_number: 1, //USB Number connect, can connect multiple
    _connect_mode_serial_port: 2, //Serial connect
    _connect_mode_net: 3, // NetWork connect
    _connect_mode_bluetooth: 4 // Bluetooth connect
}

/**
 * Get the reader object, and the method will automatically connect to the reader service
 */
function getReader() {
    var reader = {};
    var socketOpen = false;
    var target = null;

    //Callback function
    reader.onResult = function(callback) {
        target.addEvent("SocketRet", callback);
    };

    var WSonOpen = function() {
        socketOpen = true;

        var resultData = {
            functionId: READER_CMD._reader_server_connect,
            result: 0,
            resultData: ""
        };
        if (target != null)
            target.fireEvent("SocketRet", resultData);

        //alert('WebSocket Open.');
        console.log('WebSocket Open.');
    };

    var WSonMessage = function(msg) {
        var str = msg.data.split('|');
        var len = str.length;
        if (str[0] != PROTOCEL_FLAG._reader_cmd_STX || str[len - 1] != PROTOCEL_FLAG._reader_cmd_ETX) {
            return;
        }
     
        var resultData = {
            functionId: parseInt(str[1]), //Command code
            result: parseInt(str[2]), //Result code, 0 succeeded, others failed
            resultData: len == 5 ? str[3] : "" //Return result data
        };

        if (target != null)
            target.fireEvent("SocketRet", resultData);
    };

    var WSonClose = function() {
        socketOpen = false;
        /* var resultData = {
            functionId: READER_CMD._reader_server_close,
            result: 0,
            resultData: ""
        };

        if (target != null)
            target.fireEvent("SocketRet", resultData); */

        console.log('Reader Service Close.');
    };

    var WSonError = function() {
        /* var resultData = {
            functionId: READER_CMD._reader_server_connect,
            result: -1,
            resultData: ''
        };
        if (target != null)
            target.fireEvent("SocketRet", resultData); */
        alert("Server not running");
    };

    //Create socket, establish connection
    (function createSocket() {
        try {
            if ("WebSocket" in window) {
                socket = new WebSocket("ws://localhost:8256/ReaderWebServer/");
            } else if ("MozWebSocket" in window) {
                socket = new MozWebSocket("ws://localhost:8256/ReaderWebServer/");
            } else {
                return null;
            }
            socket.onopen = WSonOpen;
            socket.onmessage = WSonMessage;
            socket.onclose = WSonClose;
            socket.onerror = WSonError;
            target = new EventTarget();
        } catch (ex) {
            alert(ex.Message);
        }
    })();

    var SendCmd = function(readerCmd) {
        if (true == socketOpen) {
            var len = readerCmd.length;
            var entryCmd = PROTOCEL_FLAG._reader_cmd_STX + "|";
            for (var i = 0; i < len; i++) {
                entryCmd += readerCmd[i] + "|";
            }
            entryCmd += PROTOCEL_FLAG._reader_cmd_ETX;
            socket.send(entryCmd);
        } else {
            alert("Server not connected.");
        }
    };

    /********************************************************************************************************
     ******************* Data conversion method ************************************************************************
     ********************************************************************************************************/
    /**
     * Converts a string to a hexadecimal character
     * @param {string} str The string to convert
     * @returns {string} Converted hexadecimal characters
     */
    reader.strToHexCharCode = function(str) {
        if (str === "")
            return "";
        var hexCharCode = [];
        //hexCharCode.push("0x");
        for (var i = 0; i < str.length; i++) {
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join("");
    };

    /**
     * Converts a hexadecimal character to a string
     * @param {string} hexCharCodeStr The hexadecimal character to convert
     * @returns {string} Converted String
     */
    reader.hexCharCodeToStr = function(hexCharCodeStr) {
        var trimedStr = hexCharCodeStr.trim();
        var rawStr =
            trimedStr.substr(0, 2).toLowerCase() === "0x" ?
            trimedStr.substr(2) :
            trimedStr;
        var len = rawStr.length;
        if (len % 2 !== 0) {
            alert("Illegal Format ASCII Code!");
            return "";
        }
        var curCharCode;
        var resultStr = [];
        for (var i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
            resultStr.push(String.fromCharCode(curCharCode));
        }
        return resultStr.join("");
    };

    /*****************************************************************************************************************
     ************ Reader Function **************************************************************************************
     *****************************************************************************************************************/
    /**
     * Connect Serial Communication Reader
     * @param {number} port Port number, values range from 0 to 19, corresponding to ports COM1 to com20
     * @param {number} baud Baud rate, 9600 ~ 115200
     * @returns {number} Reader Handle
     */
    reader.connectSerialPort = function(port, baud) {
        SendCmd([READER_CMD._reader_cmd_connect, CONNECT_MODE._connect_mode_serial_port, port, baud]);
    };

    /**
     * Connect USB Communication Reader
     * @returns Reader Handle
     */
    reader.connectUsb = function() {
        SendCmd([READER_CMD._reader_cmd_connect, CONNECT_MODE._connect_mode_usb]);
    };

    /**
     * Connect the reader by USB number, this function can be used to connect multiple devices
     * @param {number} n Reader Number, values range from 0 to 255.
     * @returns {number} Reader Handle
     */
    reader.connectUsbNumber = function(n) {
        SendCmd([READER_CMD._reader_cmd_connect, CONNECT_MODE._connect_mode_usb_number, n]);
    };

    /**
     * Disconnect the reader
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.disconnect = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_disconnect, icdev]);
    };

    /**
     * Read hardware version
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Hardware version
     */
    reader.readHardwareVersion = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_read_ver, icdev]);
    };

    /**
     * Let the reader beep for a while.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} time Beep time, The unit is 10ms and from 0 to 255.
     */
    reader.readerBeep = function(icdev, time) {
        SendCmd([READER_CMD._reader_cmd_beep, icdev, time]);
    };

    /**
     * Read product serial number.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Product serial number
     */
    reader.readProductSerialNumber = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_read_snr, icdev]);
    };

    /**
     * Change the serial port baud rate of the Reader.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} baud The serial port baud rate to be changed, the values range from 9600 to 115200.
     * @description This function can be used to change baud rate after serial communication Reader connection is successful.
     */
    reader.SetBaudRate = function(icdev, baud) {
        SendCmd([READER_CMD._reader_cmd_set_baud, icdev, baud]);
    };

    /**
     * Get whether the user card slot has a card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} Card seat status, 0 -- no card, 1 -- card.
     */
    reader.getReaderStatus = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_get_status, icdev]);
    };

    /**
     * Write data to EEPROM of Reader.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting offset address, the value is 0 to 999.
     * @param {string} data The data to be written.
     */
    reader.writeEEPROM = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_write_eeprom, icdev, offset, data]);
    };

    /**
     * Read data from EEPROM of Reader.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset Starting offset address to read, the value is 0 to 999.
     * @param {number} len The byte length of the data to be read, values range from 1 to 1000.
     * @returns {string} Data read, the length is len * 2.
     */
    reader.readEEPROM = function(icdev, offset, len) {
        SendCmd([READER_CMD._reader_cmd_read_eeprom, icdev, offset, len]);
    };

    /**
     * Set USB Reader number.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} number The reader number to be set, values range from 0 to 255.
     * @description Use connectusb() function to connect the reader. After successful, call this function to set the Reader number.
     * After the number is set successfully, you can use the connectusbnumber() method to connect the Reader with the specified number.
     */
    reader.setUsbReaderNumber = function(icdev, number) {
        SendCmd([READER_CMD._reader_cmd_set_number, icdev, number]);
    };

    /**
     * Get the USB Reader number
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} The Reader number.
     */
    reader.getUsbReaderNumber = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_get_number, icdev]);
    };

    /**
     * Power on of contact slot
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.turnOn = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_turn_on, icdev]);
    };

    /**
     * Power off of contact slot
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.turnOff = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_turn_off, icdev]);
    };

    /**
     * Turn off RF (RF 13.56MHz) for a period of time and then turn it on again. 
     * This operation will make all cards in the antenna area return to the original state.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} time Reset RF time, range form 1 to 500ms; 0 means turn off RF.
     */
    reader.rfReset = function(icdev, time) {
        SendCmd([READER_CMD._reader_cmd_rf_reset, icdev, time]);
    };

    /**
     * Select the contactless card protocol, the reader default ISO14443 TypeA protocol.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} prot protocol code. 0: TypeA; 1: TypeB; 2: ICODE
     */
    reader.selectProtocol = function(icdev, prot) {
        SendCmd([READER_CMD._reader_cmd_select_protocol, icdev, prot]);
    };

    /****************************************************************************************************************
     *************** Contactless Card(13.56MHZ) ****************************************************************************
     ****************************************************************************************************************/
    /**
     * To activate the ISO14443 TypeA protocol card, call this function before operate the TypeA protocol card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode 0 -- IDLE mode. Only the card in IDLE state can respond to Reader's command. With rf_halt() function, the card can be prevented from repeated operation. 
     * 1 -- ALL mode, Cards in both IDLE and HALT states respond to the reader's commands.
     * @returns {string} Card serial number.
     */
    reader.rfCard = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_rf_card, icdev, mode]);
    };

    /**
     * Put the TypeA card in the halt state and the card will not respond to any command.
     * The Card needs to be reactivated when the card is operated again.
     * @param {number}} icdev The handle returned by the connection reader.
     */
    reader.rfHalt = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_rf_halt, icdev]);
    };

    /**
     *To activate the ISO14443 TypeB protocol card, call this function before operate the TypeB protocol card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Card serial number.
     */
    reader.rfCardB = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_rf_card_b, icdev]);
    };

    /**
     * Put the type a card in the halt state and the card will not respond to any command.
     * The Card needs to be reactivated when the card is operated again.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} snr The serial number of the card to be halt.
     */
    reader.rfHaltB = function(icdev, snr) {
        SendCmd([READER_CMD._reader_cmd_rf_halt_b, icdev, snr]);
    };

    /******************* S50/S70 Card **********************/
    // Before operate S50/S70 card, you need to call "rfCard()" to activate the card.
    /**
     * Authenticate S50/S70 card key.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode Key Code, 0 -- Use KeyA; 4 -- KeyB.
     * @param {number} sector The sector number to authenticate.
     * @param {string} key The sector key to authenticate, The length is 12.
     */
    reader.mifareAuthenticationKey = function(icdev, mode, sector, key) {
        SendCmd([READER_CMD._reader_cmd_m_auth_key, icdev, mode, sector, key]);
    };

    /**
     * Write data to the specified block of S50/S70 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number (absolute block number) to write data.
     * @param {string} data The data to be write.
     */
    reader.mifareWrite = function(icdev, block, data) {
        SendCmd([READER_CMD._reader_cmd_m_write, icdev, block, data]);
    };

    /**
     * Read the specified block data form S50/S70 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number to be read (absolute block number)
     * @returns {string} The data read.
     */
    reader.mifareRead = function(icdev, block) {
        SendCmd([READER_CMD._reader_cmd_m_read, icdev, block]);
    };

    /**
     * Initialize the S50/S70 card block value. The value block data uses a special data structure. 
     * If you want to perform value operation, you need to initialize value, and then you can read, Increment, and Decrement.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number (absolute block number) to initialize the value.
     * @param {number} value The value to initialize.
     */
    reader.mifareInitValue = function(icdev, block, value) {
        SendCmd([READER_CMD._reader_cmd_m_init_value, icdev, block, value]);
    };

    /**
     * Read the value of the specified block of S50/S70 card, which must be initialized.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number of the value to read (absolute block number)
     * @returns {number} Returns the value.
     */
    reader.mifareReadValue = function(icdev, block) {
        SendCmd([READER_CMD._reader_cmd_m_read_value, icdev, block]);
    };

    /**
     * S50/S70 card specifies the block increment value, which must be initialized.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number (absolute block number) to increment value.
     * @param {number} value The value to increment.
     */
    reader.mifareIncrementValue = function(icdev, block, value) {
        SendCmd([READER_CMD._reader_cmd_m_increment_value, icdev, block, value]);
    };

    /**
     * S50/S70 card specifies the block decrement value, which must be initialized.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number (absolute block number) to decrement value.
     * @param {number} value The value to decrement.
     */
    reader.mifareDecrementValue = function(icdev, block, value) {
        SendCmd([READER_CMD._reader_cmd_m_decrement_value, icdev, block, value]);
    };

    /****************** Contactless CPU Card *******************************************************/
    // Before operate contactless cpu card, you need to activate the card.
    /**
     * Contactless TypeA CPU card Reset.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Reset information returned by card.
     */
    reader.mifareCpuReset = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_c_cpu_reset, icdev]);
    };

    /**
     * Contactless TypeB CPU card Reset.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.mifareCpuResetB = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_c_cpu_reset_b, icdev]);
    };

    /**
     * Contactless Cpu Card(include TypeA and TypeB) Tansmit Command.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} cmd The Command to send.
     * @returns {string} The response information returned by the card includes sw1sw2.
     */
    reader.mifareCpuTransmit = function(icdev, cmd) {
        SendCmd([READER_CMD._reader_cmd_c_cpu_Transmit, icdev, cmd]);
    };

    /******************** Ultralight / Ultralight C / Ultralight EV Card *******************/
    // Before operate Ultralight / Ultralight C / Ultralight EV card, you need to activate the card.
    /**
     * Authenticate ultralight C Key
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} key Key, length is 32.
     */
    reader.ulcAuthenticationKey = function(icdev, key) {
        SendCmd([READER_CMD._reader_cmd_uc_auth_key, icdev, key]);
    };

    /**
     * Authenticate ultralight EV Key
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} key Key, length is 8.
     */
    reader.ulevAuthenticationKey = function(icdev, key) {
        SendCmd([READER_CMD._reader_cmd_uev_auth_key, icdev, key]);
    };

    /**
     * Read data from ultralight or ultralight C Card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number of the data to be read, 
     * For Ultralight card, the values range from 0 to 15; For Ultralight C  card, the values range form 0 to 43.
     * @returns {string} returns data read.
     */
    reader.ulcRead = function(icdev, block) {
        SendCmd([READER_CMD._reader_cmd_u_read, icdev, block]);
    };

    /**
     * Write data to ultralight or ultralight C Card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} block The block number to write data.
     * For Ultralight card, the values range from 0 to 15; For Ultralight C  card, the values range form 0 to 43.
     * @param {string} data The data to be written, the length is 8, not enough pad 0.
     */
    reader.ulcWrite = function(icdev, block, data) {
        SendCmd([READER_CMD._reader_cmd_u_write, icdev, block, data]);
    };

    /**
     * Chang key of ultralight C card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} key New key to change, length is 8.
     */
    reader.ulcChangeKey = function(icdev, key) {
        SendCmd([READER_CMD._reader_cmd_uc_change_key, icdev, key]);
    };

    /********************** NTAG213/215/216 Tag**********************************************/
    // Before operate NTAG213/215/216 tag, you need to activate the tag.
    /**
     * Authenticate ntag213/214/216 tag password.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} pwd The password to authenticate, length is 8.
     */
    reader.ntagAuthenticationPassword = function(icdev, pwd) {
        SendCmd([READER_CMD._reader_cmd_ntag_auth_pwd, icdev, pwd]);
    };

    /**
     * Read data from ntag213/214/216 tag.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page The page address to read data. For NTAG213 tag, the values range from 0 to 44; 
     * For NTAG215 tag, the values range from 0 to 134; For NTAG216 tag, the values range from 0 to 230.
     * @returns {string} Data read.
     */
    reader.ntagRead = function(icdev, page) {
        SendCmd([READER_CMD._reader_cmd_ntag_read, icdev, page]);
    };

    /**
     * Write data to ntag213/214/216 tag.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page The page address to write data. For NTAG213 tag, the values range from 0 to 44; 
     * For NTAG215 tag, the values range from 0 to 134; For NTAG216 tag, the values range from 0 to 230.
     * @param {string} data he data to be written, the length is 8, not enough pad 0.
     */
    reader.ntagWrite = function(icdev, page, data) {
        SendCmd([READER_CMD._reader_cmd_ntag_write, icdev, page, data]);
    };

    /**
     * Read counter of nfc form ntag213/214/216 tag.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} number counter number.
     * @returns {number} the value of counter.
     */
    reader.ntagGetCounter = function(icdev, number) {
        SendCmd([READER_CMD._reader_cmd_ntag_counter, icdev, number]);
    };

    /**
     * Read ntag version.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} version.
     */
    reader.ntagReadVersion = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_ntag_version, icdev]);
    };

    /**
     * Read ntag signature info.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} signature info.
     */
    reader.ntagReadSIG = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_ntag_sig, icdev]);
    };

    /************ ISO15693(ICODE2) Card ***********************************************************************/
    // The default protocol of the reader is ISO14443 TypeA. Please call "selectProtocol()"  to select the protocol before operating ICODE2.
    /**
     * Set data exchange mode
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode 0 -- standard mode, baud rate is 26.5 kbit/s; 1 -- fast mode, baud rate is 53 kbit/s.
     */
    reader.icode2SetMode = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_icode2_set_mode, icdev, mode]);
    };

    /**
     * ICode2 Inventory, returns DSFID and UID.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} afi_flag Whether it matches the value of AFI. 0 -- no; 1 -- yes.
     * @param {number} afi AFI value.
     * @param {number} slot_flag Channel type. 0: 16 channels, which can operate multiple cards within the antenna range; 1: 1 channel, only one card can be operated.
     * @returns {string} Card response information. Multiple cards are separated by #, and each card data is separated by * sign.
     * which is preceded by a DSFID value (number, Decimal) , followed by a card Uid.
     * @example 12*abcdef1234567890#34*1234567890abcdef, It means there are 2 cards,
     * The card 1 uid is abcdef1234567890 and DSFID is 12; The card 2 uid is 1234567890abcdef and DSFID is 34.
     */
    reader.icode2Inventory = function(icdev, afi_flag, afi, slot_flag) {
        SendCmd([READER_CMD._reader_cmd_icode2_inventory, icdev, afi_flag, afi, slot_flag]);
    };

    /**
     * Set ICODE2 card to Select status.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} uid The card uid to be set to the selected state.
     */
    reader.icode2Select = function(icdev, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_select, icdev, uid]);
    };

    /**
     * Set ICODE2 card to Ready status.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {string} uid Card uid to be set to Ready status, length is 16.
     */
    reader.icode2Ready = function(icdev, select_flag, address_flag, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_reset_to_ready, icdev, select_flag, address_flag, uid]);
    };

    /**
     * Set the ICODE2 card enter the Quiet state, and the card will not respond to any command after entered the Quiet state.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} uid Card uid to be set to Quiet status, length is 16.
     */
    reader.icode2Quiet = function(icdev, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_to_quiet, icdev, uid]);
    };

    /**
     * Read ICODE2 multiple block data.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {number} option_flag 0 -- The card does not return the security status of the block; 1 -- The card returns the security state of the block.
     * @param {number} startBlock The starting block number to be read, the values range from 0 to 27.
     * @param {number} blockNumber Number of blocks to read data.
     * @param {string} uid Card uid to read data, length is 16.
     * @returns {string} Data read. When option_flag = 0, every 8 characters is a block of data; when option_flag = 1, every 10 characters is a block of data (including security state),
     * The first two characters are security status. If '00' means that the block is not locked, it can read and write data. If '01' means that the block is locked, it can only read but not write
     * @example Read two blocks data from Block 0, i.e, read the data of blocks 0 and 1.
     * If the security status is not returned, the data is '1234567890abcdef', where '12345678' is block 0 data and '90abcdef' is block 1 data.
     * If the security status is returned, the data is '00123456780190abcdef', where '0012345678' is the security status and data of block 0, the first two characters '00' mean the block is unlocked, and the following characters is block 0 data;
     * '0190abcdef' is the security status and data of block 1. The first two characters '01' mean the block is locked, and the following characters is block 1 data;
     */
    reader.icode2Read = function(icdev, select_flag, address_flag, option_flag, startBlock, blockNumber, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_read, icdev, select_flag, address_flag, option_flag, startBlock, blockNumber, uid]);
    };

    /**
     * Writes data to multiple blocks of ICODE2 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {number} startBlock The starting block number to write data, the values range from 0 to 27.
     * @param {number} blockNumber Number of blocks to write data.
     * @param {string} uid The Card Uid to write data, the length is 16.
     * @param {string} data The data to be written, the length is blockNumber * 8, not enough pad 0.
     */
    reader.icode2Write = function(icdev, select_flag, address_flag, startBlock, blockNumber, uid, data) {
        SendCmd([READER_CMD._reader_cmd_icode2_write, icdev, select_flag, address_flag, startBlock, blockNumber, uid, data]);
    };

    /**
     * Write Application Family Identifier
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {string} uid The uid of the card to write AFI, length is 16.
     * @param {string} afi The value of AFI.
     */
    reader.icode2WriteAFI = function(icdev, select_flag, address_flag, uid, afi) {
        SendCmd([READER_CMD._reader_cmd_icode2_write_afi, icdev, select_flag, address_flag, uid, afi]);
    };

    /**
     * Write Data Storage Format Identifier
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {string} uid The uid of the card to write DSFID, length is 16.
     * @param {string} dsfid The value of DSFID.
     */
    reader.icode2WriteDSFID = function(icdev, select_flag, address_flag, uid, dsfid) {
        SendCmd([READER_CMD._reader_cmd_icode2_write_dsfid, icdev, select_flag, address_flag, uid, dsfid]);
    };

    /**
     * Set Electronic Article Surveillance
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode Request flag. 0 -- Can be executed by any card; 1 -- Only the selected card is executed.
     * @param {number} eas 0 -- Set the EAS to 0; 1 -- Set the EAS to 1.
     */
    reader.icode2SetEAS = function(icdev, mode, eas) {
        SendCmd([READER_CMD._reader_cmd_icode2_set_eas, icdev, mode, eas]);
    };

    /**
     * Permanently lock ICODE2 data block.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {string} uid The uid of the card to lock data block, length is 16.
     * @param {numer} block The block number to lock data block, the values range from  0 to 27.
     */
    reader.icode2Lock = function(icdev, select_flag, address_flag, uid, block) {
        SendCmd([READER_CMD._reader_cmd_icode2_lock, icdev, select_flag, address_flag, uid, block]);
    };

    /**
     * Lock the AFI of ICODE2 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {string} uid The uid of the card to lock AFI, length is 16.
     */
    reader.icode2LockAFI = function(icdev, select_flag, address_flag, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_lock_afi, icdev, select_flag, address_flag, uid]);
    };

    /**
     * Lock the DSFID of ICODE2 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} select_flag 0 -- execute the command according to the "address_flag" parameter; 
     * 1 -- Only the card in the selected state can execute the command.
     * @param {number} address_flag 0 -- Request is not address mode, uid is invalid, any card will execute;
     * 1 -- Request is address mode, and the uid is different. Only the card with the uid matching can execute the command.
     * @param {string} uid The uid of the card to lock DSFID, length is 16.
     */
    reader.icode2LockDSFID = function(icdev, select_flag, address_flag, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_lock_dsfid, icdev, select_flag, address_flag, uid]);
    };

    /**
     * Lock the EAS of ICODE2 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode Request flag. 0 -- Can be executed by any card; 1 -- Only the selected card is executed.
     */
    reader.icode2LockEAS = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_icode2_lock_eas, icdev, mode]);
    };
    /*
    //Read the security status information of multiple blocks of ICODE2 card.
    reader.icode2GetSecurity = function(icdev, select_flag, address_flag, startBlock, blockNumber, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_get_mulblock_security, icdev, select_flag, address_flag, startBlock, blockNumber, uid]);
    };

    //Get ICODE2 card system information
    reader.icode2GetSysInfo = function(icdev, select_flag, address_flag, uid) {
        SendCmd([READER_CMD._reader_cmd_icode2_get_sysinfo, icdev, select_flag, address_flag, uid]);
    };*/

    /***************************************************************************************************************************
     ************************** Ultra High Frequency(900MHZ) *****************************************************************************
     ***************************************************************************************************************************/
    /**
     * Inventory tag.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Returns the RSSI, CRC, PC and EPC of tags are separated by #.
     * RSSI reflects the size of the chip input signal, does not include antenna gain and directional coupler attenuation. RSSI is the strength of the chip
     * input signal, hexadecimal has the symbol number, the unit is dBm. For example, RSSI is 0xC9, representing the chip input signal strength is -55dbm.
     * CRC is Cyclic Redundancy Check, PC is Protocol Control, EPC is Electronic Product Code.
     * @example If the return data is 'C9#D3#3400#1234567890ABCDEF12345678', then C9 is RSSI, D3 is CRC, 3400 is PC, 1234567890ABCDEF12345678 is EPC.
     */
    reader.uhfInventory = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_uhf_inventory, icdev]);
    };

    /**
     * Set selection mode
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode 0x00 -- Send select command to select specific tag before all operation.
     * 0x01 -- The select command is not sent before the tag operation.
     * 0x02 -- Only send the select command before the tag operation polling inventory. such as select a specific tag before read, write, lock and kill.
     */
    reader.uhfSetSelectMode = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_uhf_select_mode, icdev, mode]);
    };

    /**
     * Select the tag and set the Select mode to 0x02.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} epc The EPC of the label to be selected.
     */
    reader.uhfSelect = function(icdev, epc) {
        SendCmd([READER_CMD._reader_cmd_uhf_select, icdev, epc]);
    };

    /**
     * Reads data in the tag Memory Bank that specifies the address and length
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} pwd Access password, the length is 8.
     * @param {number} memBank The memory bank to write data. 0 -- RFU bank; 1 -- EPC bank; 2 -- TID bank; 3 -- User bank.
     * @param {number} offset  The starting address to read. The unit is word. i.e. 2 byte/16 bit.
     * @param {number} len The length to read. The unit is word. i.e. 2 byte/16 bit.
     * @returns {string} Return the data, PC and EPC of the tag, separated by #.
     */
    reader.uhfRead = function(icdev, pwd, memBank, offset, len) {
        SendCmd([READER_CMD._reader_cmd_uhf_read, icdev, pwd, memBank, offset, len]);
    };

    /**
     * Write data to the address specified in the tag memory bank.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} pwd Access password, 长度 8.
     * @param {number} memBank The memory bank to write data. 0 -- RFU bank; 1 -- EPC bank; 2 -- TID bank; 3 -- User bank.
     * @param {number} offset The starting address to write. The unit is word. i.e. 2 byte/16 bit.
     * @param {string} data The data to be written. The length must be a multiple of 4.
     * @returns {string} Return the PC and EPC of the current tag, separated by #.
     */
    reader.uhfWrite = function(icdev, pwd, memBank, offset, data) {
        SendCmd([READER_CMD._reader_cmd_uhf_write, icdev, pwd, memBank, offset, data]);
    };

    /**
     * Lock or unlock the memory bank.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} pwd Access password, length is 8.
     * @param {string} lockData Lock operation parameters, length is 6. 
     */
    reader.uhfSetLock = function(icdev, pwd, lockData) {
        SendCmd([READER_CMD._reader_cmd_uhf_lock_unlock, icdev, pwd, lockData]);
    };

    /**
     * Kill tag. After killed, the card needs inventory to operate.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} killPwd Kill Password, length is 8. if Kill Password is not set, i.e. Kill Password is all 0, according to the Gen2 protocol the tag will not be Killed.
     */
    reader.uhfKill = function(icdev, killPwd) {
        SendCmd([READER_CMD._reader_cmd_uhf_kill, icdev, killPwd]);
    };

    /**
     * Set the work region.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} regionCode The work region code. 01 -- China(900MHz); 4 -- China(800MHz); 2 -- US; 3 -- Europe; 6 -- Korea.
     */
    reader.uhfSetRegion = function(icdev, regionCode) {
        SendCmd([READER_CMD._reader_cmd_uhf_set_region, icdev, regionCode]);
    };

    /**
     * Set RF Channel
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} chIndex Channel Index, Calculation formula of channel parameters as follows: Freq_CH is channel frequency
     * China(900MHz): CH_Index = (Freq_CH-920.125M)/0.25M
     * China(800MHz): CH_Index = (Freq_CH-840.125M)/0.25M
     * US: CH_Index = (Freq_CH-902.25M)/0.5M
     * Europe: CH_Index = (Freq_CH-865.1M)/0.2M
     * Korea: CH_Index = (Freq_CH-917.1M)/0.2M
     */
    reader.uhfSetChannel = function(icdev, chIndex) {
        SendCmd([READER_CMD._reader_cmd_uhf_set_channel, icdev, chIndex]);
    };

    /**
     * Get RF Channel
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} Channel Index, Calculation formula of channel parameters as follows: Freq_CH is channel frequency
     * China(900MHz): Freq_CH = CH_Index* 0.25M + 920.125M
     * China(800MHz): Freq_CH = CH_Index* 0.25M + 840.125M
     * US: Freq_CH = CH_Index* 0.5M + 902.25M
     * Europe: Freq_CH = CH_Index* 0.2M + 865.1M
     * Korea: Freq_CH = CH_Index* 0.2M + 917.1M
     */
    reader.uhfGetChannel = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_uhf_get_channel, icdev]);
    };

    /**
     * Set Frequency-hopping spread spectrum
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} fhss 0 -- turn off FHSS; 1 -- turn on FHSS.
     */
    reader.uhfSetHFSS = function(icdev, fhss) {
        SendCmd([READER_CMD._reader_cmd_uhf_set_fhss, icdev, fhss]);
    };

    /**
     * Set the power of the power amplifier.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} papower PA Power, such as 2000, i.e. 20dBm.
     */
    reader.uhfSetPapower = function(icdev, papower) {
        SendCmd([READER_CMD._reader_cmd_uhf_set_papower, icdev, papower]);
    };

    /**
     * Get the power of the power amplifier
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} PA Power, such as 2000, i.e. 20dBm.
     */
    reader.uhfGetPapower = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_uhf_get_papower, icdev]);
    };

    /**
     * Set Continuous Wave
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} cw 0 -- Turn off CW; 1 -- Turn on CW.
     */
    reader.uhfSetCW = function(icdev, cw) {
        SendCmd([READER_CMD._reader_cmd_uhf_set_cw, icdev, cw]);
    };

    /**
     * Set the parameters of the Reader Modem
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} modemParam The modem parameters to be set are Mixer Gain (length is 2), IF Amplifier Gain (length is 2) and Signal Threshold (length is 4).
     * For example: '030601b0', where 03 is Mixer Gain(9dB); 06 is IF Amplifier Gain(36dB); 01b0 is the Signal Threshold. 
     * The smaller the threshold, the lower the RSSI the tag returns, but the more unstable it is, the less than a certain value can not be demodulated at all; 
     * the larger the threshold, the larger the RSSI the tag returns, the closer the distance, the more stable. 01B0 is the recommended minimum value.
     */
    reader.uhfSetModem = function(icdev, modemParam) {
        SendCmd([READER_CMD._reader_cmd_uhf_set_modem, icdev, modemParam]);
    };

    /**
     * Get the parameters of the Reader Modem
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} The modem parameters to be set are Mixer Gain (length is 2), IF Amplifier Gain (length is 2) and Signal Threshold (length is 4).
     */
    reader.uhfGetModem = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_uhf_get_modem, icdev]);
    };

    /*******************************************************************************************************
     ******************* Low Frequency(125KHZ) *************************************************************************
     *******************************************************************************************************/
    /**
     * Set the Reader Datarate.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} rateCode the datarate code. 0 -- 1/8; 1 -- 1/16; 2 -- 1/32; 3 -- 1/40; 4 -- 1/50; 5 -- 1/64; 6 -- 1/100; 7 -- 1/128.
     */
    reader.lfSetDatarate = function(icdev, rateCode) {
        SendCmd([READER_CMD._reader_cmd_lf_set_datarate, icdev, rateCode]);
    };

    /**
     * Open 125KHz RF Signal
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.lfOpenMod = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_lf_open_mod, icdev]);
    };

    /**
     * Close 125KHz RF Signal
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.lfCloseMod = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_lf_close_mod, icdev]);
    };

    /************* T5557 Card ************************************************/
    /**
     * Write data to T5557 card (not encrypted)
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page The page number to be write data. For the T5557 card, the value should be 1 (vendor code zone) or 0 (user data zone)
     * @param {number} block The block number of the write data. When page = 1, the value is 1 or 2; when page = 0, the value is 0 to 7.
     * @param {number} lockBit Whether to lock the block data, if the block data is locked, it cannot be modified. 
     * If this parameter is 0, the block data is not locked. If the parameter is 1, the data is locked.
     * @param {string} data The data to be written, the length is 8, not enough pad 0.
     */
    reader.t5557WriteFree = function(icdev, page, block, lockBit, data) {
        SendCmd([READER_CMD._reader_cmd_t5557_write_free, icdev, page, block, lockBit, data]);
    };

    /**
     * Write data to T5557 card (encrypted)
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page The page number to be write data. For the E5557 card, the value should be 1 (vendor code zone) or 0 (user data zone)
     * @param {number} block The block number of the write data. When page = 1, the value is 1 or 2; when page = 0, the value is 0 to 7.
     * @param {number} lockBit Whether to lock the block data, if the block data is locked, it cannot be modified. 
     * If this parameter is 0, the block data is not locked. If the parameter is 1, the data is locked.
     * @param {string} pwd Password, length is 8.
     * @param {string} data The data to be written, the length is 8, not enough pad 0.
     */
    reader.t5557WritePwd = function(icdev, page, block, lockBit, pwd, data) {
        SendCmd([READER_CMD._reader_cmd_t5557_write_pwd, icdev, page, block, lockBit, pwd, data]);
    };

    /**
     * Read data from T5557 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page The page number to be Read. For the T5557 card, the value should be 1 (vendor code zone) or 0 (user data zone)
     * @param {number} block The block number to be Read data. When page = 1, the value is 1 or 2; when page = 0, the value is 0 to 7.
     * @param {number} aorbit Whether to wake up the card with the password before read. If it is 0, the card is not woken up. If it is 1, the card is waked up
     * @param {string} pwd Card password, length is 8. if the card password is invalid, any value can be provided.
     * @returns {string} Returns the data from card.
     */
    reader.t5557ReadDirect = function(icdev, page, block, aorbit, pwd) {
        SendCmd([READER_CMD._reader_cmd_t5557_read_direct, icdev, page, block, aorbit, pwd]);
    };

    /**
     * Wake up AOR mode encryption T5557 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} pwd Card password, length is 8.
     */
    reader.t5557Aor = function(icdev, pwd) {
        SendCmd([READER_CMD._reader_cmd_t5557_aor, icdev, pwd]);
    };

    /**
     * Convert a T5557 card to an ID card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} cardId ID card number to set, length is 10.
     */
    reader.t5557toID = function(icdev, cardId) {
        SendCmd([READER_CMD._reader_cmd_t5557_to_id, icdev, cardId]);
    };

    /**
     * Restore the converted ID card to a T5557 card.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.idRestoreT5557 = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_id_restore_t5557, icdev]);
    };

    /*************** EM4001 / EM4305 卡操作******************************************************/
    /**
     * Read EM4001 or compatible card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Card number
     */
    reader.em4001Read = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_em_read, icdev]);
    };

    /**
     * Write data to the specified address of EM4305 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} addr The address to write data, the value range form 0 to 13.
     * @param {string} data The data to be written, the length is 8, not enough pad 0.
     */
    reader.em4305Write = function(icdev, addr, data) {
        SendCmd([READER_CMD._reader_cmd_em4305_write, icdev, addr, data]);
    };

    /**
     * Read the data of the specified address of EM4305 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} addr The address to read data, the value range form 0 to 13.
     * @returns {string} Return the card data.
     */
    reader.em4305ReadBiphase = function(icdev, addr) {
        SendCmd([READER_CMD._reader_cmd_em4305_read_biphase, icdev, addr]);
    };

    /**
     * Read the data of the specified address of EM4305 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} addr The address to read data, the value range form 0 to 13.
     * @returns {string} Return the card data.
     */
    reader.em4305ReadManchester = function(icdev, addr) {
        SendCmd([READER_CMD._reader_cmd_em4305_read_manchester, icdev, addr]);
    };

    /**
     * Login EM4305 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} pwd Password, length is 8.
     */
    reader.em4305Login = function(icdev, pwd) {
        SendCmd([READER_CMD._reader_cmd_em4305_login, icdev, pwd]);
    };

    /**
     * Lock the specified address of EM4305 card. After locking, the data cannot be changed and cannot be unlocked.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} addr The starting address to lock.
     * @param {number} addrNumber The number of addresses to lock.
     */
    reader.em4305Protect = function(icdev, addr, addrNumber) {
        SendCmd([READER_CMD._reader_cmd_em4305_protect, icdev, addr, addrNumber]);
    };

    /**
     * Disable EM4305 Card.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.em4305Disable = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_em4305_disable, icdev]);
    };

    /**
     * Set EM Card type.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode 0 - Manchester RF/64; 1 - Manchester RF/32; 2 - Bi-phase RF/32
     */
    reader.em4305SetMode = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_em4305_set_mode, icdev, mode]);
    };

    /**
     * Format EM4305 as ID card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} isLock Whether to lock the card. 0 is not encrypted, 1 is encrypted, the ID card number can not be changed after the card is encrypted.
     * @param {string} lockPwd Lock password, length is 8.
     * @param {string} cardNo Card number converted to ID card, length is 10.
     */
    reader.em4305ToId = function(icdev, isLock, lockPwd, cardNo) {
        SendCmd([READER_CMD._reader_cmd_em4305_to_id, icdev, isLock, lockPwd, cardNo]);
    };
    /*//Format EM4305 as ID FDX_B card.
    reader.em4305ToFdxb = function(icdev, isLock, lockPwd, cardNo) {
        SendCmd([READER_CMD._reader_cmd_em4305_to_fdxb, icdev, isLock, lockPwd, cardNo]);
    };*/


    /*********************************************************************************************************
     ******************** Contact Card ****************************************************************************
     *********************************************************************************************************/

    /********** Contact CPU Card ***************************************************/
    /**
     * Contact CPU card reset.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} slot Card slot number, 0 -- User Card; 1 -- SAM1; 2 -- SAM2; 3 -- SAM3; 4 -- SAM4
     * @returns {string} Reset information returned by card.
     */
    reader.cpuReset = function(icdev, slot) {
        SendCmd([READER_CMD._reader_cmd_cpu_reset, icdev, slot]);
    };

    /**
     * Contact CPU card send command.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} slot Card slot number, 0 -- User Card; 1 -- SAM1; 2 -- SAM2; 3 -- SAM3; 4 -- SAM4
     * @param {string} cmd The Command to send.
     * @returns {string} The response information returned by the card includes sw1sw2.
     */
    reader.cpuTransmit = function(icdev, slot, cmd) {
        SendCmd([READER_CMD._reader_cmd_cpu_transmit, icdev, slot, cmd]);
    };

    /**
     * Set the baud rate of contact CPU card
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} slot Card slot number, 0 -- User Card; 1 -- SAM1; 2 -- SAM2; 3 -- SAM3; 4 -- SAM4
     * @param {number} baud The new baud rate to be changed, value is 9600/19200/38400.
     */
    reader.cpuSetBaud = function(icdev, slot, baud) {
        SendCmd([READER_CMD._reader_cmd_cpu_set_baud, icdev, slot, baud]);
    };

    /************ AT24C series card operation ***************************************************************/
    /**
     * Write data to AT24C Series Card
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} cardtype The code of AT24CXX card. 1 -- AT24C01A; 2 -- AT24C02; 4 -- AT24C04; 8 -- AT24C08; 16 -- AT24C16;
     * 32 -- AT24C32; 64 -- AT24C64; 128 -- AT24C128; 256 -- AT24C256; 512 -- AT24C512; 1024 -- AT24C1024
     * @param {number} offset The starting offset address to write data.
     * @param {string} data The data to be written.
     */
    reader.at24cWrite = function(icdev, cardtype, offset, data) {
        SendCmd([READER_CMD._reader_cmd_24c_write, icdev, cardtype, offset, data]);
    };

    /**
     * Read data from AT24C Series Card
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} cardtype The code of AT24CXX card. 1 -- AT24C01A; 2 -- AT24C02; 4 -- AT24C04; 8 -- AT24C08; 16 -- AT24C16;
     * 32 -- AT24C32; 64 -- AT24C64; 128 -- AT24C128; 256 -- AT24C256; 512 -- AT24C512; 1024 -- AT24C1024
     * @param {number} offset The starting address of the data to be read.
     * @param {number} len Length of bytes to read.
     * @returns {string} Returns the data, length is len * 2.
     */
    reader.at24cRead = function(icdev, cardtype, offset, len) {
        SendCmd([READER_CMD._reader_cmd_24c_read, icdev, cardtype, offset, len]);
    };

    /************ AT45D041 Card ***************************************************************/
    /**
     * Write data to AT45D041 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page The page address to write data, the values range from 0 to 2047.
     * @param {number} offset The starting address of the page to be written, range: 0 to 263.
     * @param {string} data The data to be written.
     */
    reader.at45d041Write = function(icdev, page, offset, data) {
        SendCmd([READER_CMD._reader_cmd_45D041_write, icdev, page, offset, data]);
    };

    /**
     * Read data from AT45D041 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} page Page address to read, range: 0 to 2047.
     * @param {number} offset The starting address of the page to be read, range: 0 to 263.
     * @param {number} len The byte length of the data to be read, rang: 1 to 264.
     * @returns {string} Returns the data, length is len * 2.
     */
    reader.at45d041Read = function(icdev, offset, page, len) {
        SendCmd([READER_CMD._reader_cmd_45D041_read, icdev, page, offset, len]);
    };

    /************ SLE4442 Card ***************************************************************/
    /**
     * Read data from SLE4442 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting offset address to read data, values range from 0 to 255.
     * @param {number} len The byte length of the data to be read, rang: 1 to 256.
     * @returns {string} Returns the data, length is len * 2.
     */
    reader.sle4442Read = function(icdev, offset, len) {
        SendCmd([READER_CMD._reader_cmd_4442_read, icdev, offset, len]);
    };

    /**
     * Write data to SLE4442 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting offset address to write data, values range from 0 to 255.
     * @param {string} data The data to be written.
     */
    reader.sle4442Write = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_4442_write, icdev, offset, data]);
    };

    /**
     * Verify Security Code of SLE4442 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} sc Security Code, length is 6.
     */
    reader.sle4442VerifySC = function(icdev, sc) {
        SendCmd([READER_CMD._reader_cmd_4442_verify_sc, icdev, sc]);
    };

    /**
     * Change Security Code of SLE4442 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} sc New Security Code, length is 6.
     */
    reader.sle4442ChangeSC = function(icdev, sc) {
        SendCmd([READER_CMD._reader_cmd_4442_change_sc, icdev, sc]);
    };

    /**
     * Read Security Code of SLE4442 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} The Security Code. It can only be read after the SC is verified successfully. 
     * Before the SC is verified successfully, this function may return correct, but the card SC is not read.
     */
    reader.sle4442ReadSC = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_4442_read_sc, icdev]);
    };

    /**
     * Reads the value of the error counter of SLE4442 card. 
     * The initial value is 3, if the SC is verified wrong once, the error counter is decremented by 1. 
     * If the error counter value is 0, the card is locked, the data can only be read and can not be changed, also SC can not be verified;
     * If it is not zero, SC can be restored to the initial value 3 after SC verified successful once.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} The value of the error counter of SLE4442 card.
     */
    reader.sle4442ReadCounter = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_4442_read_counter, icdev]);
    };

    /**
     * Read the protection bit of SLE4442 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Protection bit data, length is 8. The address of SLE4442 card from 0 to 31 is the protected zone, it's 32 bytes. 
     * Each byte uses 1 bit protection bit data to indicate whether it is protected or not.
     * The protection bit data is 4 byte i.e. 32 bit, corresponding to the first 32 bytes of the card. If the bit is 0, the corresponding byte is protected, and 1 is unprotected.
     */
    reader.sle4442ReadProBit = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_4442_read_pro_bit, icdev]);
    };

    /**
     * Protect the protection zone data of SLE4442 card. The protected data is solidified and cannot be changed
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting address of the data to be protected. range: 0 to 23.
     * @param {data} data The data to be protected must be consistent with the existing data in the card.
     */
    reader.sle4442Protect = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_4442_protect, icdev, offset, data]);
    };

    /************ SLE4428 Card ***************************************************************/

    /**
     * Read data from SLE4428 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting offset address to read data, values range from 0 to 1023.
     * @param {number} len The byte length of the data to be read, rang: 1 to 1024.
     * @returns {string} Returns the data, length is len * 2.
     */
    reader.sle4428Read = function(icdev, offset, len) {
        SendCmd([READER_CMD._reader_cmd_4428_read, offset, len]);
    };

    /**
     * Write data to SLE4428 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting offset address to write data, values range from 0 to 1023.
     * @param {string} data The data to be written.
     */
    reader.sle4428Write = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_4428_write, offset, data]);
    };

    /**
     * Verify Security Code of SLE428 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} sc Security Code, length is 4.
     */
    reader.sle4428VerifySC = function(icdev, sc) {
        SendCmd([READER_CMD._reader_cmd_4428_verify_sc, icdev, sc]);
    };

    /**
     * Change Security Code of SLE428 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {string} sc New Security Code, length is 4.
     */
    reader.sle4428ChangeSC = function(icdev, sc) {
        SendCmd([READER_CMD._reader_cmd_4428_change_sc, icdev, sc]);
    };

    /**
     * Read Security Code of SLE4428 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} The Security Code. It can only be read after the SC is verified successfully. 
     * Before the SC is verified successfully, this function may return correct, but the card SC is not read.
     */
    reader.sle4428ReadSC = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_4428_read_sc, icdev]);
    };

    /**
     * Reads the value of the error counter of SLE4428 card. 
     * The initial value is 8, if the SC is verified wrong once, the error counter is decremented by 1. 
     * If the error counter value is 0, the card is locked, the data can only be read and can not be changed, also SC can not be verified;
     * If it is not zero, SC can be restored to the initial value 8 after SC verified successful once.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} The value of the error counter of SLE4442 card.
     */
    reader.sle4428ReadCounter = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_4428_read_counter, icdev]);
    };

    /**
     * Reads data with protection bit from SLE4428 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting offset address to read data, values range from 0 to 1023.
     * @param {number} len The byte length of the data to be read, rang: 1 to 1024.
     * @returns {string} Returns the data, length is len * 4. Every two characters is a byte, and the data of each byte is followed by a byte of protection bit flag data.
     *  If protection bit flag data is 00, it means that the data of the corresponding byte has been protected. If it is FF, it means that it has not been protected.
     * @example Read 2 Bytes of data from 0 Bytes, the data returned is '010002FF', 01 is 0 Bytes of data, protected, 02 is 1 byte of data, not protected.
     */
    reader.sle4428ReadWithPro = function(icdev, offset, len) {
        SendCmd([READER_CMD._reader_cmd_4428_read_pro, icdev, offset, len]);
    };

    /**
     * Write data to SLE4428 card and protect it. The protected data is solidified and cannot be changed
     * @param {number} icdev 
     * @param {number} offset The starting offset address to write data, values range from 0 to 1023.
     * @param {string} data The data to be written.
     */
    reader.sle4428WritePro = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_4428_write_pro, icdev, offset, data]);
    };

    /**
     * Protect the protected area data of SLE4428 card. The protected data is solidified and cannot be changed
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting address of the data to be protected. range: 0 to 1023.
     * @param {data} data The data to be protected must be consistent with the existing data in the card.
     */
    reader.sle4428Portect = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_4428_protect, icdev, offset, data]);
    };

    /********** AT88SC102 Card ****************************************************************/
    /**
     * Read data from AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The zone to read. 0 -- Configuration Zone; 1 -- Application Zone 1; 2 -- Application Zone 2.
     * @param {number} offset The start offset address to read.
     * When zone = 0, The values range from 0 to 21. which contains the Fabrication zone, Issuer zone, Security code, Security Code Attempts Counter and Code Protected Zone.
     * When zone = 1, The values range from 0 to 69. which contains the Application Zone 1 and Application Zone 1 Erase Key.
     * When zone = 2, The values range from 0 to 85. which contains the Application Zone 1, Application Zone 1 Erase Key, Erase Counter and Memory Test Zone.
     * @param {number} len The length of the data to read.
     * When zone = 0, The values range from 1 to 22; When zone = 1, The value ranges from 1 to 70; When zone = 2, The values range from 1 to 86.
     * @returns {string} Returns the data of read, length is len * 2.
     */
    reader.at88sc102Read = function(icdev, zone, offset, len) {
        SendCmd([READER_CMD._reader_cmd_102_read, icdev, zone, offset, len]);
    };

    /**
     * Read data to AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The zone to write. 0 -- Configuration Zone; 1 -- Application Zone 1; 2 -- Application Zone 2.
     * @param {number} offset The start offset address to write.
     * When zone = 0, The values range from 0 to 21. which contains the Fabrication zone, Issuer zone, Security code, Security Code Attempts Counter and Code Protected Zone.
     * When zone = 1, The values range from 0 to 69. which contains the Application Zone 1 and Application Zone 1 Erase Key.
     * When zone = 2, The values range from 0 to 85. which contains the Application Zone 1, Application Zone 1 Erase Key, Erase Counter and Memory Test Zone.
     * @param {string} data The data to be written.
     */
    reader.at88sc102Write = function(icdev, zone, offset, data) {
        SendCmd([READER_CMD._reader_cmd_102_write, icdev, zone, offset, data]);
    };

    /**
     * Erase the data at the specified address of AT88SC102 card. AT88SC102 cards need to erase the data before to write. 
     * The AT88SC102 card has a dual-byte erasure feature, so its offset address "offset" and the erase length "len" must be even number.
     * For example, when erasing the byte content with address 35, the contents of 34 and 35 are erased together.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The zone to erase. 0 -- Configuration Zone; 1 -- Application Zone 1; 2 -- Application Zone 2.
     * @param {number} offset The start offset address to erase.
     * When zone = 0, The values range from 0 to 21. which contains the Fabrication zone, Issuer zone, Security code, Security Code Attempts Counter and Code Protected Zone.
     * When zone = 1, The values range from 0 to 69. which contains the Application Zone 1 and Application Zone 1 Erase Key.
     * When zone = 2, The values range from 0 to 85. which contains the Application Zone 1, Application Zone 1 Erase Key, Erase Counter and Memory Test Zone.
     * @param {number} len The length of the data to erase.
     * When zone = 0, The values range from 1 to 22; When zone = 1, The values range from 1 to 70; When zone = 2, The values range from 1 to 86.
     */
    reader.at88sc102Erase = function(icdev, zone, offset, len) {
        SendCmd([READER_CMD._reader_cmd_102_erase, icdev, zone, offset, len]);
    };

    /**
     * Verify the Security Code of the AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sc Security Code, length is 4.
     */
    reader.at88sc102VerifySC = function(icdev, sc) {
        SendCmd([READER_CMD._reader_cmd_102_verify_sc, icdev, sc]);
    };

    /**
     * Change the Security Code of the AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sc New Security Code, length is 4.
     */
    reader.at88sc102VerifySC = function(icdev, sc) {
        SendCmd([READER_CMD._reader_cmd_102_change_sc, icdev, sc]);
    };

    /**
     * Read the Security Code of the AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Security Code, length is 4.
     */
    reader.at88sc102ReadSC = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_102_read_sc, icdev]);
    };

    /**
     * Read the Security Code Attempts Counter(SCAC) of AT88SC102.
     * The initial value is 4, the SC verify error once, the counter value decrease 1, if four attempts to verify SC are unsuccessful, 
     * the card will not be available; If it is verify successful once, reset the SCAC to 4.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} The Security Code Attempts Counter.
     */
    reader.at88sc102ReadCounter = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_102_read_sc_counter, icdev]);
    };

    /**
     * Verify the erase key of the AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Application zone address. 1 is Application Zone 1; 2 is Application Zone 2.
     * @param {string} ek The Erase key. When zone = 1, The length is 12; When zone = 2, The length is 8.
     */
    reader.at88sc102VerifyEraseKey = function(icdev, zone, ek) {
        SendCmd([READER_CMD._reader_cmd_102_verify_erase_key, icdev, zone, ek]);
    };

    /**
     * Change the erase key of the AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Application zone address. 1 is Application Zone 1; 2 is Application Zone 2.
     * @param {string} ek The New Erase key. When zone = 1, The length is 12; When zone = 2, The length is 8.
     */
    reader.at88sc102ChangeEraseKey = function(icdev, zone, ek) {
        SendCmd([READER_CMD._reader_cmd_102_change_erase_key, icdev, zone, ek]);
    };

    /**
     * Read the erase key of the AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Application zone address. 1 is Application Zone 1; 2 is Application Zone 2.
     * @returns {string} Erase Key. When zone = 1, The length is 12; When zone = 2, The length is 8.
     */
    reader.at88sc102ReadEraseKey = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_102_read_erase_key, icdev, zone]);
    };

    /**
     * Read the value of application zone 2 Erase Counter(EC) of at88sc102 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} Returns the Erase Counter.
     */
    reader.at88sc102ReadEraseCounter = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_102_read_erase_counter, icdev]);
    };

    /**
     * Set application zone protection of the AT88SC102 card to zero. 
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Application zone address. 1 is Application Zone 1; 2 is Application Zone 2.
     * @param {number} wr 1 -- Write Protection Bit(PR); 1 -- Read Protection Bit(RD).
     */
    reader.at88sc102PrRdClear = function(icdev, zone, wr) {
        SendCmd([READER_CMD._reader_cmd_102_PR_RD_clear, icdev, zone, wr]);
    };

    /**
     * AT88SC102 card Simulate personalization.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode 0 -- Simulate; 1 -- Cancel.
     */
    reader.at88sc102SimulatePsnl = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_102_simulate_psnl, icdev, mode]);
    };

    /**
     * Personalization(fuse) for AT88SC102 card.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.at88sc102Psnl = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_102_psnl, icdev]);
    };

    /************ AT88SC1604 Card **************************************************************/
    /**
     * Read data from AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of the zone to be read; 0 is public zone; 1 to 4 are application zone.
     * @param {number} offset The starting address to read. 
     * When zone = 0, the values range from 0 to 26. It contains Manufacturer Code, Publisher Code, Security Code, Security Code Attempts Counter, Code Protection Zone, Application Zone 1 Security Code, Application Zone 1 Security Code Counter, Application Zone 1 Erase Key and Application Zone 1 Erase Key Counter;
     * When zone = 1, the values range from 0 to 1199. It contains Application Zone 1 (the first 1195 bytes), Application Zone 2 Security Code, Application Zone 2 Erase Key and Application Zone 2 Erase Key Counter;
     * When zone = 2, the values range from 0 to 260. It contains the Application Zone 2 (the first 256 bytes), Application Zone 3 Security Code, Application Zone 3 Erase Key and Application Zone 3 Erase Key Counter;
     * When zone = 3, the values range from 0 to 260. It contains the Application zone 3 (the first 256 bytes), Application zone 4 Security Code, Application Zone 4 Erase Key and Application Zone 4 Erase Key Counter;
     * When zone = 4, the values range from 0 to 257. It contains the Application zone 4 (the first 256 bytes) and the test zone.
     * @param {number} len The length of the data to read.
     * When zone = 0, the values range from 1 to 27;
     * When zone = 1, the values range from 1 to 1200;
     * When zone = 2, the values range from 1 to 261;
     * When zone = 3, the values range from 1 to 261;
     * When zone = 4, the values range from 1 to 258.
     * @returns {string} Returns the data which is read, length is 2 * len.
     */
    reader.at88sc1604Read = function(icdev, zone, offset, len) {
        SendCmd([READER_CMD._reader_cmd_1604_read, icdev, zone, offset, len]);
    };

    /**
     *Write data to the AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of the zone to be write; 0 is public zone; 1 to 4 are application zone.
     * @param {number} offset The starting address to write.
     * When zone = 0, the values range from 0 to 26. It contains Manufacturer Code, Publisher Code, Security Code, Security Code Attempts Counter, Code Protection Zone, Application Zone 1 Security Code, Application Zone 1 Security Code Counter, Application Zone 1 Erase Key and Application Zone 1 Erase Key Counter;
     * When zone = 1, the values range from 0 to 1199. It contains Application Zone 1 (the first 1195 bytes), Application Zone 2 Security Code, Application Zone 2 Erase Key and Application Zone 2 Erase Key Counter;
     * When zone = 2, the values range from 0 to 260. It contains the Application Zone 2 (the first 256 bytes), Application Zone 3 Security Code, Application Zone 3 Erase Key and Application Zone 3 Erase Key Counter;
     * When zone = 3, the values range from 0 to 260. It contains the Application zone 3 (the first 256 bytes), Application zone 4 Security Code, Application Zone 4 Erase Key and Application Zone 4 Erase Key Counter;
     * When zone = 4, the values range from 0 to 257. It contains the Application zone 4 (the first 256 bytes) and the test zone.
     * @param {string} data The data to be write to the card.
     */
    reader.at88sc1604Write = function(icdev, zone, offset, data) {
        SendCmd([READER_CMD._reader_cmd_1604_write, icdev, zone, offset, data]);
    };

    /**
     * Erase the data in the AT88SC1604 card, and you need to erase the data before changing it.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of the zone to be data. 0 is public zone; 1 to 4 are application zone.
     * @param {number} offset The starting address to erase the data.
     * When zone = 0, the values range from 0 to 26. It contains Manufacturer Code, Publisher Code, Security Code, Security Code Attempts Counter, Code Protection Zone, Application Zone 1 Security Code, Application Zone 1 Security Code Counter, Application Zone 1 Erase Key and Application Zone 1 Erase Key Counter;
     * When zone = 1, the values range from 0 to 1199. It contains Application Zone 1 (the first 1195 bytes), Application Zone 2 Security Code, Application Zone 2 Erase Key and Application Zone 2 Erase Key Counter;
     * When zone = 2, the values range from 0 to 260. It contains the Application Zone 2 (the first 256 bytes), Application Zone 3 Security Code, Application Zone 3 Erase Key and Application Zone 3 Erase Key Counter;
     * When zone = 3, the values range from 0 to 260. It contains the Application zone 3 (the first 256 bytes), Application zone 4 Security Code, Application Zone 4 Erase Key and Application Zone 4 Erase Key Counter;
     * When zone = 4, the values range from 0 to 257. It contains the Application zone 4 (the first 256 bytes) and the test zone.
     * @param {number} len The length of bytes to erase.
     * When zone = 0, the values range from 1 to 27;
     * When zone = 1, the values range from 1 to 1200;
     * When zone = 2, the values range from 1 to 261;
     * When zone = 3, the values range from 1 to 261;
     * When zone = 4, the values range from 1 to 258.
     */
    reader.at88sc1604Erase = function(icdev, zone, offset, len) {
        SendCmd([READER_CMD._reader_cmd_1604_erase, icdev, zone, offset, len]);
    };

    /**
     * Verify the Security Code of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Password Zone to verify, 0 is Main Security Code;  1 to 4 is Application Security Code.
     * @param {string} sc Security Code, length is 4.
     */
    reader.at88sc1604VerifySC = function(icdev, zone, sc) {
        SendCmd([READER_CMD._reader_cmd_1604_verify_sc, icdev, zone, sc]);
    };

    /**
     * Change the Security Code of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Password Zone to Change, 0 is Main Security Code;  1 to 4 is Application Security Code.
     * @param {string} sc New Security Code, length is 4.
     */
    reader.at88sc1604ChangeSC = function(icdev, zone, sc) {
        SendCmd([READER_CMD._reader_cmd_1604_change_sc, icdev, zone, sc]);
    };

    /**
     * Read the Security Code of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Password Zone to Read, 0 is Main Security Code;  1 to 4 is Application Security Code.
     * @returns {string} Security Code, length is 4.
     */
    reader.at88sc1604ReadSC = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_1604_Read_sc, icdev, zone]);
    };

    /**
     * Read Security Code Attempts Counter of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Password Zone to Read Counter, 0 is Main Security Code;  1 to 4 is Application Security Code.
     * @returns {number} Security Code Counter
     */
    reader.at88sc1604ReadCounter = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_1604_read_sc_counter, icdev, zone]);
    };

    /**
     * Verify the Application Erase Key of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of Application Zone, the values range from 1 to 4.
     * @param {string} ek Erase Key, length is 4.
     */
    reader.at88sc1604VerifyEraseKey = function(icdev, zone, ek) {
        SendCmd([READER_CMD._reader_cmd_1604_verify_erase_key, icdev, zone, ek]);
    };

    /**
     * Change Application Zone Erase Key of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of Application Zone, the values range from 1 to 4.
     * @param {string} ek New Erase Key, length is 4.
     */
    reader.at88sc1604ChangeEraseKey = function(icdev, zone, ek) {
        SendCmd([READER_CMD._reader_cmd_1604_change_erase_key, icdev, zone, ek]);
    };

    /**
     * Read Application Zone Erase Key of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of Application Zone, the values range from 1 to 4.
     * @returns {string} Erase Key, length is 4.
     */
    reader.at88sc1604ReadEraseKey = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_1604_read_erase_key, icdev, zone]);
    };

    /**
     * Read Application Zone Erase Key Counter of AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The address of Application Zone, the values range from 1 to 4.
     * @returns {number} Erase Key Counter.
     */
    reader.at88sc1604ReadEraseKeyCounter = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_1604_read_erase_key_counter, icdev, zone]);
    };

    /**
     * Set application zone protection of the AT88SC1604 card to zero. 
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone Application zone address, the values range from 1 to 4.
     * @param {number} wr 1 -- Write Protection Bit(PR); 1 -- Read Protection Bit(RD).
     */
    reader.at88sc1604PrRdClear = function(icdev, zone, wr) {
        SendCmd([READER_CMD._reader_cmd_1604_PR_RD_clear, icdev, zone, wr]);
    };

    /**
     * The AT88SC1604 card simulates personalization.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} mode 0 -- Simulate; 1 -- Cancel.
     */
    reader.at88sc1604SimulatePsnl = function(icdev, mode) {
        SendCmd([READER_CMD._reader_cmd_1604_simulate_psnl, icdev, mode]);
    };

    /**
     * Personalization(fuse) for AT88SC1604 card.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.at88sc1604Psnl = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_1604_psnl, icdev]);
    };

    /******** AT88SC1608 Card ********************************************************/

    /**
     * Reset the AT88SC1608 card, execute this command before operate the card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} Reset information, length is 8.
     */
    reader.at88sc1608Reset = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_1608_reset, icdev]);
    };

    /**
     * Read the user zone data from the AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The user zone to read , values range from 0 to 7.
     * @param {number} offset The start offset address to read. Range: 0 to 255.
     * @param {number} len The length of the data to read. Range: 1 to 256.
     * @returns {string} Returns the data of read, length is 2 * len.
     */
    reader.at88sc1608ReadUser = function(icdev, zone, offset, len) {
        SendCmd([READER_CMD._reader_cmd_1608_read_user, icdev, zone, offset, len]);
    };

    /**
     * Write the user zone data to the AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The user zone to write , value range from 0 to 7.
     * @param {number} offset The start offset address to write. Range: 0 to 255.
     * @param {number} data  The data to write.
     */
    reader.at88sc1608WriteUser = function(icdev, zone, offset, data) {
        SendCmd([READER_CMD._reader_cmd_1608_write_user, icdev, zone, offset, data]);
    };

    /**
     * Read the configuration zone data from the AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The start offset address to read. Range: 0 to 127.
     * @param {number} len The length of the data to read. Range: 1 to 128.
     * @returns {string} data read, length is 2 * len.
     */
    reader.at88sc1608ReadConfig = function(icdev, offset, len) {
        SendCmd([READER_CMD._reader_cmd_1608_read_config, icdev, offset, len]);
    };

    /**
     * Write the configuration zone data to the AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The start offset address to write. Range: 0 to 127.
     * @param {string} data The data to write.
     */
    reader.at88sc1608WriteConfig = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_1608_write_config, icdev, offset, data]);
    };

    /**
     * Verify the password of the AT88SC1608 card. The 7 zone write password is the Secure Code, the configuration area data can be read after verification was successful.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets Password set number to verify, values range from 0 to 7.
     * @param {number} wr Password type to verify. 0 is write password, 1 is read password.
     * @param {string} pwd Password, length is 6.
     */
    reader.at88sc1608VerifyPwd = function(icdev, sets, wr, pwd) {
        SendCmd([READER_CMD._reader_cmd_1608_verify_pwd, icdev, sets, wr, pwd]);
    };

    /**
     * Change the password of the AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets Password set number to change, values range from 0 to 7.
     * @param {number} wr Password type to change. 0 is write password, 1 is read password.
     * @param {string} pwd New Password, length is 6.
     */
    reader.at88sc1608ChangePwd = function(icdev, sets, wr, pwd) {
        SendCmd([READER_CMD._reader_cmd_1608_change_pwd, icdev, sets, wr, pwd]);
    };

    /**
     * Read the password of the AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets Password set number to read, values range from 0 to 7.
     * @param {number} wr Password type to read. 0 is write password, 1 is read password.
     * @returns {string} Password, length is 6.
     */
    reader.at88sc1608ReadPwd = function(icdev, sets, wr) {
        SendCmd([READER_CMD._reader_cmd_1608_read_pwd, icdev, sets, wr]);
    };

    /**
     * Read Password Attempts Counter of AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets Password set number to read counter, values range from 0 to 7.
     * @param {number} wr Password type to read. 0 is write password, 1 is read password.
     * @returns {number} The value of the Password Attempts Counter
     */
    reader.at88sc1608ReadPwdCounter = function(icdev, sets, wr) {
        SendCmd([READER_CMD._reader_cmd_1608_read_pwd_counter, icdev, sets, wr]);
    };

    /**
     * Read Access Register of User Zone of AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone User zone address to read, values range from 0 to 7.
     * @returns {number} the Access Register of User Zone.
     */
    reader.at88sc1608ReadAR = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_1608_read_ar, icdev, zone]);
    };

    /**
     * Change Access Register of User Zone of AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone User zone address to change, values range from 0 to 7.
     * @param {number} ar New Access Register of User Zone.
     */
    reader.at88sc1608WriteAR = function(icdev, zone, ar) {
        SendCmd([READER_CMD._reader_cmd_1608_write_ar, icdev, zone, ar]);
    };

    /**
     * Read the AT88SC1608 card fuse state.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} Returns the fuse state of card.
     */
    reader.at88sc1608ReadFuse = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_1608_read_fuse, icdev]);
    };

    /**
     * Personalization(fuse, Let per = 0) for AT88SC1608 card.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.at88sc1608Psnl = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_1608_psnl, icdev]);
    };

    /************** AT88SC153 Card **********************************************************/
    /**
     * Reset the AT88SC153 card, execute this command before operate the card.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {string} The reset information, length is 8.
     */
    reader.at88sc153Reset = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_153_reset, icdev]);
    };

    /**
     * Read the AT88SC153 card user zone data.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The user zone address, values range from 0 to 2.
     * @param {number} offset The starting address to read, the values range from 0 to 63.
     * @param {number} len The length of the data to read, the values range from 1 to 64.
     * @returns {string} The data of read returned from the card, length is 2 * len.
     */
    reader.at88sc153ReadUser = function(icdev, zone, offset, len) {
        SendCmd([READER_CMD._reader_cmd_153_read_user, icdev, zone, offset, len]);
    };

    /**
     * Write data to the AT88SC153 card user zone.
     * @param {number} icdev The handle returned by the connection reader.
      * @param {number} zone The user zone address, values range from 0 to 2.
     * @param {number} offset The starting address to write, the values range from 0 to 63.
     * @param {string} data The data to write.
     */
    reader.at88sc153WriteUser = function(icdev, zone, offset, data) {
        SendCmd([READER_CMD._reader_cmd_153_write_user, icdev, zone, offset, data]);
    };

    /**
     * Read the AT88SC153 card configuration zone data.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset  The starting address to read, the values range from 0 to 63.
     * @param {number} len The length of the data to read, the values range from 1 to 64.
     * @returns {string} The data of read returned from the card, length is 2 * len.
     */
    reader.at88sc153ReadConfig = function(icdev, offset, len) {
        SendCmd([READER_CMD._reader_cmd_153_read_config, icdev, offset, len]);
    };

    /**
     * Write data to the AT88SC153 card configuration zone.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} offset The starting address to write, the values range from 0 to 63.
     * @param {string} data The data to write.
     */
    reader.at88sc153WriteConfig = function(icdev, offset, data) {
        SendCmd([READER_CMD._reader_cmd_153_write_config, icdev, offset, data]);
    };

    /**
     * Verify the AT88SC153 card read and write password.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets The password sets, value is 0 or 1.
     * @param {number} wr Password type,  0 -- write key; 1 -- read key.
     * @param {string} pwd Password, length is 6.
     */
    reader.at88sc153VerifyPwd = function(icdev, sets, wr, pwd) {
        SendCmd([READER_CMD._reader_cmd_153_verify_pwd, icdev, sets, wr, pwd]);
    };

    /**
     * Change the AT88SC153 card read and write password.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets The password sets, value is 0 or 1.
     * @param {number} wr Password type,  0 -- write key; 1 -- read key.
     * @param {string} pwd New Password, length is 6.
     */
    reader.at88sc153ChangePwd = function(icdev, sets, wr, pwd) {
        SendCmd([READER_CMD._reader_cmd_153_change_pwd, icdev, sets, wr, pwd]);
    };

    /**
     * Read the read and write password of AT88SC153 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets The password sets, value is 0 or 1.
     * @param {number} wr Password type,  0 -- write key; 1 -- read key.
     * @returns {string} Password, length is 6.
     */
    reader.at88sc153ReadPwd = function(icdev, sets, wr) {
        SendCmd([READER_CMD._reader_cmd_153_read_pwd, icdev, sets, wr]);
    };

    /**
     * Read the read and write password attempt counter of AT88SC153 card.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} sets The password sets, value is 0 or 1.
     * @param {number} wr Password type,  0 -- write key; 1 -- read key.
     * @returns {number} The password attempt counter.
     */
    reader.at88sc153ReadPwdCounter = function(icdev, sets, wr) {
        SendCmd([READER_CMD._reader_cmd_153_read_pwd_counter, icdev, sets, wr]);
    };

    /**
     * Read the value of the AT88SC153 card AR (User Zone Access Register).
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The user zone address to read AR, values range from 0 to 2.
     * @returns {number} The value of AR.
     */
    reader.at88sc153ReadAR = function(icdev, zone) {
        SendCmd([READER_CMD._reader_cmd_153_read_ar, icdev, zone]);
    };

    /**
     * Write the value of the AT88SC153 card AR (User Zone Access Register).
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} zone The user zone address to write AR, values range from 0 to 2.
     * @param {number} ar The value of AR to write.
     */
    reader.at88sc153WriteAR = function(icdev, zone, ar) {
        SendCmd([READER_CMD._reader_cmd_153_write_ar, icdev, zone, ar]);
    };

    /**
     * Read the value of AT88SC153 card DCR.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {numer} The value of DCR.
     */
    reader.at88sc153ReadDCR = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_153_read_dcr, icdev]);
    };

    /**
     * Write the value of AT88SC153 card DCR.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} dcr The value of DCR to write.
     */
    reader.at88sc153WriteDCR = function(icdev, dcr) {
        SendCmd([READER_CMD._reader_cmd_153_write_dcr, icdev, dcr]);
    };

    /**
     * Read the AT88SC153 card fuse state.
     * @param {number} icdev The handle returned by the connection reader.
     * @returns {number} Returns the fuse state of card.
     */
    reader.at88sc153ReadFuse = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_153_read_fuse, icdev]);
    };

    /**
     * Write the AT88SC153 card fuse state.
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} fuse The value of the fuse to write, FAB, CMA and PER must be fusing in turn.
     */
    reader.at88sc153WriteFuse = function(icdev, fuse) {
        SendCmd([READER_CMD._reader_cmd_153_write_fuse, icdev, fuse]);
    };

    /**
     * Personalization(fuse, Let per = 0) for AT88SC153 card.
     * @param {number} icdev The handle returned by the connection reader.
     */
    reader.at88sc153Psnl = function(icdev) {
        SendCmd([READER_CMD._reader_cmd_153_psnl, icdev]);
    };

    /*********** Magnetic Strip Card ***********************************************************************/
    /**
     * Read magnetic stripe card data
     * @param {number} icdev The handle returned by the connection reader.
     * @param {number} timeout Timeout, the unit is seconds. If the card is not swiped during this time, a timeout error is returned
     * @returns {string} The data on track 1,2 and 3 of the magnetic stripe card are separated by a # sign
     */
    reader.magneticStripRead = function(icdev, timeout) {
        SendCmd([READER_CMD._reader_cmd_mag_read, icdev, timeout]);
    };

    return reader;
}

//https://www.jianshu.com/p/5507b3a85cc5
function EventTarget() {
    // Message container is used to store messages and corresponding operation functions.
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    // Add registration message interface
    addEvent: function(type, func) {
        // When the message does not exist, create a message of this type and push the callback function into the execution queue.
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = [func];
        } else {
            // When the message type exists, push the callback function into the execution queue
            this.handlers[type].push(func);
        }
    },
    // Publish message interface
    fireEvent: function(type, event) {
        // Returns directly when the message does not exist
        if (!this.handlers[type])
            return;

        if (!event.target) {
            event.target = this;
        }

        // Execute the action queue corresponding to the message in turn
        for (var i = 0, len = this.handlers[type].length; i < len; i++) {
            this.handlers[type][i].call(this, event)
        }
    },
    // Remove message interface
    removeEvent: function(type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            // Start traversal and remove the action if it exists
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};