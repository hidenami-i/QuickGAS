import SpreadsheetApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import Ui = GoogleAppsScript.Base.Ui;
import ButtonSet = GoogleAppsScript.Base.ButtonSet;
import Button = GoogleAppsScript.Base.Button;
import Menu = GoogleAppsScript.Base.Menu;

/**
 * Spread sheet UI.
 */
export class UI {

    /**
     * GoogleAppsScript.Base.Ui cache.
     */
    private static uiCache: Ui;

    /**
     * Gets GoogleAppsScript.Base.Ui.
     */
    public static getUi(): Ui {
        if (this.uiCache == undefined || this.uiCache == null) {
            this.uiCache = SpreadsheetApp.getUi();
        }

        return this.uiCache;
    }

    public static createMenu(title: string, addMenuFn: (menu: Menu) => void) {
        const menu: Menu = this.getUi().createMenu(title);
        addMenuFn(menu);
        menu.addToUi();
    }

    /**
     * Yes or No alert.
     * @param {string} prompt
     * @returns {boolean}
     */
    public static YesNo(prompt: string): boolean;


    /**
     * Yes or No alert.
     * @param {string} title
     * @param {string} prompt
     * @returns {boolean}
     */
    public static YesNo(title: string, prompt: string): boolean;

    /**
     * Yes or No alert.
     * @param {string} title
     * @param {string} prompt
     * @returns {boolean}
     */
    public static YesNo(title: string = "", prompt: string = ""): boolean {
        const ui = this.getUi();
        const button: Button = ui.alert(title, prompt, ui.ButtonSet.YES_NO)
        return button == ui.Button.NO;
    }

    /**
     * Ok or Cancel alert.
     * @param {string} prompt
     * @returns {boolean}
     */
    public static OkCancel(prompt: string): boolean;


    /**
     * Ok or Cancel alert.
     * @param {string} title
     * @param {string} prompt
     * @returns {boolean}
     */
    public static OkCancel(title: string, prompt: string): boolean;

    /**
     * Ok or Cancel alert.
     * @param {string} title
     * @param {string} prompt
     * @returns {boolean}
     */
    public static OkCancel(title: string = "", prompt: string = ""): boolean {
        const ui = this.getUi();
        const button: Button = ui.alert(title, prompt, ui.ButtonSet.OK_CANCEL)
        return button == ui.Button.CANCEL;
    }

    /**
     * Ok alert
     * @param {string} prompt
     * @returns {boolean}
     */
    public static Ok(prompt: string): boolean;

    /**
     * Ok alert
     * @param {string} title
     * @param {string} prompt
     * @returns {boolean}
     */
    public static Ok(title: string, prompt: string): boolean;


    /**
     * Ok alert
     * @param {string} title
     * @param {string} prompt
     * @returns {boolean}
     */
    public static Ok(title: string = "", prompt: string = ""): boolean {
        const ui = this.getUi();
        const button: Button = ui.alert(title, prompt, ui.ButtonSet.OK)
        return button == ui.Button.OK;
    }

    /**
     * Ok or Cancel input alert.
     * @param {string} title
     * @param {string} prompt
     * @constructor
     */
    public static InputBoxOkCancel(title: string = "", prompt: string = ""): string {
        const message: string = Browser.inputBox(title, prompt, Browser.Buttons.OK_CANCEL);
        if (message == "cancel") {
            return "";
        }
        return message;
    }

    /**
     * Simple message alert.
     * @param {string} title
     * @param {string} prompt
     */
    public static MessageBox(title: string = "", prompt: string = ""): string {
        const message: string = Browser.msgBox(title, prompt, Browser.Buttons.OK);
        if (message == "ok") {
            return "";
        }
        return message;
    }
}