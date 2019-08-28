import './pretty-json.css';
/* src https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript */

/**
 * format text if it is valid json
 * @param jsonText text to format
 * @param indentation number of whitespaces per indentation-level
 */
export default function prettyJson(jsonText: string, indentation: number = 2): string {
    try {
        const obj = JSON.parse(jsonText);
        let json = JSON.stringify(obj, null, indentation);
        json = syntaxHighlight(json);
        return json;
    } catch {
        return jsonText;
    }
}

function syntaxHighlight(json: string): string {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // tslint:disable-next-line
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function isJson(s: string): boolean {
    try {
        JSON.parse(s);
        return true;
    } catch {
        return false;
    }
}

export { syntaxHighlight, isJson };
