function getGitref() {
    var nw = window.open("");
    nw.document.write("GITREF: __REVISION__");
    return 0;
}

function getBarcodeNumbers(text) {
    return text.match(/\b[0-9]{14}\b/g);
}

function createLabels() {

    var barcodes = [];
    var text = getSelection();
    if (text !== "") {
        barcodes = getBarcodeNumbers(text);
    } else {
        barcodes = getBarcodeNumbers(document.body.innerText);
    }

    if (barcodes !== null) {

        var printWindow = window.open("");
        var doc = printWindow.document;

        function callback() {
            (function ($) {
                var jQuery = $;

                function callback() {

                    appendStylesheet(doc);

                    if (typeof barcodes === 'string') {
                        barcodes = [barcodes];
                    }

                    barcodes.forEach(function (barcode) {

                        var url = "/api/v1/labelgenerator/" + barcode;

                        var currentLabelId = "label_" + barcode;

                        var currentLabel = jQuery("<div/>", {"id": currentLabelId, "class": "label"});

                        jQuery.getJSON(url, function (data) {
                            jQuery.each(data, function (key, value) {

                                switch (key) {
                                    case "barcode":
                                        var barcodeSvg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
                                        barcodeSvg.id = "barcode_" + barcode;
                                        barcodeSvg.setAttribute("jsbarcode-format", "ITF");
                                        barcodeSvg.setAttribute("jsbarcode-value", barcode);
                                        barcodeSvg.setAttribute("jsbarcode-width", 2);
                                        barcodeSvg.setAttribute("jsbarcode-height", 30);
                                        barcodeSvg.setAttribute("jsbarcode-fontsize", 14);
                                        barcodeSvg.setAttribute("margin", 0);

                                        barcodeSvg.setAttribute("class", "barcode");

                                        doc.getElementById(currentLabelId).appendChild(barcodeSvg);

                                        var bcs = doc.createElement("script");
                                        bcs.setAttribute('type', 'text/javascript');
                                        bcs.innerHTML = "$(document).ready(function(){JsBarcode(\"#barcode_" + barcode + "\").init();})";
                                        doc.body.appendChild(bcs);

                                        jQuery("<span/>", {
                                            "id": "kommune_" + barcode,
                                            "class": "kommune",
                                            "text": "0301"
                                        }).appendTo(currentLabel);

                                        break;
                                    case "biblio":
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": key,
                                            "text": value
                                        }).appendTo(currentLabel);
                                        break;
                                    case "callNumber":
                                        jQuery("<span/>", {
                                            "id": "key_" + barcode,
                                            "class": "call-number",
                                            "text": ellipsis(value, 25)
                                        }).appendTo(currentLabel);
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": "spine",
                                            "html": fixSpineNumber(value)
                                        }).appendTo(currentLabel);
                                        break;
                                    case "copyNumber":
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": "copy-number",
                                            "text": padding(value, 3)
                                        }).appendTo(currentLabel);
                                        break;
                                    case "creator":
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": key,
                                            "text": ellipsis(value, 25)
                                        }).appendTo(currentLabel);
                                        break;
                                    case "holdingBranch":
                                        break;
                                    case "homeBranch":
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": "home-branch",
                                            "text": value
                                        }).appendTo(currentLabel);
                                        break;
                                    case "publicationDate":
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": "publication-date",
                                            "text": value
                                        }).appendTo(currentLabel);
                                        break;
                                    case "shelvingLocation":
                                        break;
                                    case "title":
                                        jQuery("<span/>", {
                                            "id": key + "_" + barcode,
                                            "class": key,
                                            "text": ellipsis(value, 25)
                                        }).appendTo(currentLabel);
                                        break;
                                }

                            });
                        });
                        currentLabel.appendTo(printWindow.document.body);
                    });
                }

                var s = doc.createElement("script");
                s.src = "https://cdn.jsdelivr.net/jsbarcode/3.3.7/barcodes/JsBarcode.itf.min.js";
                if (s.addEventListener) {
                    s.addEventListener("load", callback, false)
                } else if (s.readyState) {
                    s.onreadystatechange = callback
                }
                doc.body.appendChild(s);
            })(jQuery.noConflict());
        }

        var s = doc.createElement("script");
        s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
        if (s.addEventListener) {
            s.addEventListener("load", callback, false)
        } else if (s.readyState) {
            s.onreadystatechange = callback
        }
        doc.body.appendChild(s);

    }
}

function getStylesheet() {
    return "        /* http://meyerweb.com/eric/tools/css/reset/ "
        + "           v2.0 | 20110126"
        + "           License: none (public domain)"
        + "        */"
        + "        "
        + "        html, body, div, span, applet, object, iframe,"
        + "        h1, h2, h3, h4, h5, h6, p, blockquote, pre,"
        + "        a, abbr, acronym, address, big, cite, code,"
        + "        del, dfn, em, img, ins, kbd, q, s, samp,"
        + "        small, strike, strong, sub, sup, tt, var,"
        + "        b, u, i, center,"
        + "        dl, dt, dd, ol, ul, li,"
        + "        fieldset, form, label, legend,"
        + "        table, caption, tbody, tfoot, thead, tr, th, td,"
        + "        article, aside, canvas, details, embed, "
        + "        figure, figcaption, footer, header, hgroup, "
        + "        menu, nav, output, ruby, section, summary,"
        + "        time, mark, audio, video {"
        + "          margin: 0;"
        + "          padding: 0;"
        + "          border: 0;"
        + "          font-size: 100%;"
        + "          font: inherit;"
        + "          vertical-align: baseline;"
        + "        }"
        + "        /* HTML5 display-role reset for older browsers */"
        + "        article, aside, details, figcaption, figure, "
        + "        footer, header, hgroup, menu, nav, section {"
        + "          display: block;"
        + "        }"
        + "        body {"
        + "          line-height: 1;"
        + "        }"
        + "        ol, ul {"
        + "          list-style: none;"
        + "        }"
        + "        blockquote, q {"
        + "          quotes: none;"
        + "        }"
        + "        blockquote:before, blockquote:after,"
        + "        q:before, q:after {"
        + "          content: '';"
        + "          content: none;"
        + "        }"
        + "        table {"
        + "          border-collapse: collapse;"
        + "          border-spacing: 0;"
        + "        }"
        + "        @media only screen { .label { border: 1px solid #000; } }"
        + "        @page {margin: 0px; size: 38mm 90mm;}"
        + "        .label { width: 38mm; height: 90mm; position: relative; left: 0px; page-break-before: always; font-size: 16px; font-family: sans-serif;}"
        + "        .barcode { position: absolute; top: -30px; width: 240px; left: 30px; transform: rotate(90deg); transform-origin: left; -webkit-transform: rotate(90deg); -webkit-transform-origin: left;}"
        + "        .creator { position: absolute; top: 10px; left: 140px; transform: rotate(90deg); transform-origin: 0 0px; width: 280px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .title { position: absolute; top: 10px; left: 120px; transform: rotate(90deg); transform-origin: 0 0px; width: 280px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .call-number { position: absolute; top: 10px; left: 100px; transform: rotate(90deg); transform-origin: 0 0px; width: 280px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .publication-date { position: absolute; top: 10px; left: 80px; transform: rotate(90deg); transform-origin: 0 0px; width: 40px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .home-branch { position: absolute; top: 57px; left: 80px; transform: rotate(90deg); transform-origin: 0 0px; width: 40px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .kommune { position: absolute; top: 90px; left: 80px; transform: rotate(90deg); transform-origin: 0 0px; width: 40px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .biblio { position: absolute; top: 135px; left: 80px; transform: rotate(90deg); transform-origin: 0 0px; width: 70px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .copy-number { position: absolute; top: 210px; left: 80px; transform: rotate(90deg); transform-origin: 0 0px; width: 40px; -webkit-transform: rotate(90deg); -webkit-transform-origin: 0 0px; }"
        + "        .spine { position: absolute; top:260px; left: 10px; font-size: 16px; width: 34mm; overflow-wrap: normal; }";
}

function padding(number) {
    var ret = number;
    if ((number + "").length < 3) {
        ret = ("000" + number).slice(-3)
    }
    return ret;
}

function ellipsis(string, maxlength) {
    var ret = "";

    if (string !== null) {
        ret = string;
        if (string.length > maxlength) {
            ret = string.slice(0, maxlength) + "…";
        }
    } else {
        ret = "";
    }
    return ret;
}

function fixSpineNumber(string) {
    var ret = "";
    if (string !== null) {
        var data = string.trim();
        var splitString = data.split(" ");
        ret = data;
        switch (splitString) {
            case splitString.length < 3:
                ret = data.replace(/\s/g, "<br>");
                break;
            default:
                break;
        }
    }
    return ret;
}

function appendStylesheet(doc) {
    var css = getStylesheet(),
        head = doc.head || doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
}

function getSelection() {
    var selection = "";
    return window.getSelection().toString();
}

if (window.location.href.toLowerCase().indexOf("gitref") > -1) {
    getGitref();
} else {
    createLabels();
}