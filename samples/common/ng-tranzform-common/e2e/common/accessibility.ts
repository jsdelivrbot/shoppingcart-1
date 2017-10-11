import { browser } from 'protractor';
import { AxeResults } from 'axe-core/axe.d';

const AxeBuilder = require('axe-webdriverjs');

export class Accessibility {
  private static MAX_LINE_LENGTH = 100;

  private _axe = AxeBuilder(browser.driver);
  private history = {};

  analyze () {
    this.axe.analyze((results: AxeResults) => {
      results.violations.forEach(violation => {
        violation.nodes.forEach(node => {
          const historyKey = violation.id + node.html;
          if (!this.history[historyKey]) {
            fail(violation.help + '\n' + this.trimHtml(node.html));
            this.history[historyKey] = true;
          }
        });
      });
    });
  }

  private trimHtml (html: string) {
    const lines = html.split('\n');
    const indent = lines[lines.length - 1].match(/^ */)[0].length;
    const indentRegex = new RegExp('^ {' + indent + '}');

    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(indentRegex, '').substring(0, Accessibility.MAX_LINE_LENGTH);
    }

    return lines.join('\n');
  }

  private get axe () {
    return this._axe;
  }
}
