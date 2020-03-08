import Form = GoogleAppsScript.Forms.Form;
import { ExString } from "../utility/exString";

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
    public static GetForm(targetFormId: string = ""): Form {
        if (ExString.isNullOrEmpty(targetFormId)) {
            return FormApp.getActiveForm();
        } else {
            return FormApp.openById(targetFormId);
        }
    }

}