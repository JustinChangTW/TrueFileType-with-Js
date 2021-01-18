        var GetFileTrueType = function(fileInfo) {

            document.querySelector(fileInfo.id).addEventListener("change", x => {
                var fileArray = []
                var fileType = document.querySelector(fileInfo.displayId)
                fileInfo.name = x.target.files[0].name
                fileType.innerText = ""
                var reader = new FileReader();
                reader.readAsArrayBuffer(x.target.files[0]); //使用ArrayBuffer讀取
                reader.onload = function(e) {
                    var arrayBuffer = e.target.result
                    fileArray = new Uint8Array(arrayBuffer);
                    var hex = "";
                    for (var i = 0; i < 30; i++) {
                        var bye = fileArray[i].toString(16).toUpperCase()
                        hex += ("0" + bye).substr(bye.length - 1, 2) //補0
                        var code = fileTypeCode.find(y => hex.lastIndexOf(y.hex) >= 0) //比對最後相符字串
                        var typeName = code ? code.type : ""
                        if (typeName) {
                            fileType.innerText = typeName
                            fileInfo.type = typeName
                            break
                        }
                    }
                }
            })

            //設定對照檔
            var fileTypeCode = [{
                hex: "FFD8",
                type: ".jpg"
            }, {
                hex: "424D",
                type: ".bmp"
            }, {
                hex: "474946",
                type: ".gif"
            }, {
                hex: "89504E470D0A1A0A",
                type: ".png"
            }, {
                hex: "68656963",
                type: ".heic"
            }, ]
        }