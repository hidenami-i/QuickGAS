import Form = GoogleAppsScript.Forms.Form;
import {ExString} from "../utility/exString";
import {ExError} from "../utility/exError";

/**
 * GoogleForm extension class.
 */
export class ExGoogleForm {

    /**
     * Gets google form.
     * Current active GoogleForm if targetFormId parameter is null; otherwise target form id.
     * @param targetFormId
     * @returns {GoogleAppsScript.Forms.Form}
     */
    public static getFormById(targetFormId: string = ""): Form {
        if (ExString.isNullOrEmpty(targetFormId)) {
            return FormApp.getActiveForm();
        } else {
            return FormApp.openById(targetFormId);
        }
    }

    /**
     * Gets google form.
     * Current active GoogleForm if targetFormId parameter is null; otherwise target form id.
     * @param targetFormUrl
     * @returns {GoogleAppsScript.Forms.Form}
     */
    public static getFormByUrl(targetFormUrl: string = ""): Form {
        if (ExString.isNullOrEmpty(targetFormUrl)) {
            return FormApp.getActiveForm();
        } else {
            return FormApp.openByUrl(targetFormUrl);
        }
    }

    /**
     * Deletes all form items.
     * @param {Form} targetForm
     */
    public static deleteAllItemsByForm(targetForm: Form): void {
        ExError.throwIfNullOrUndefined(targetForm);
        targetForm.getItems().forEach(item => {
            targetForm.deleteItem(item);
        });
    }

    /**
     * Deletes all form items.
     * @param {string} value
     */
    public static deleteAllItemsById(targetFormId: string): void {
        const form = this.getFormById(targetFormId);
        form.getItems().forEach(item => {
            form.deleteItem(item);
        });
    }
}