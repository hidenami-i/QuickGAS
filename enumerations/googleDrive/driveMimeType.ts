/**
 * Google Drive Mime Type.
 * @see https://developers.google.com/drive/api/v3/mime-types
 */
enum DriveMimeType {
    Audio = "application/vnd.google-apps.audio",
    Document = "application/vnd.google-apps.document",
    Drawing = "application/vnd.google-apps.drawing",
    File = "application/vnd.google-apps.file",
    Folder = "application/vnd.google-apps.folder",
    Form = "application/vnd.google-apps.form",
    Map = "application/vnd.google-apps.map",
    Photo = "application/vnd.google-apps.photo",
    Presentation = "application/vnd.google-apps.presentation",
    Script = "application/vnd.google-apps.script",
    Site = "application/vnd.google-apps.site",
    SpreadSheet = "application/vnd.google-apps.spreadsheet",
    Video = "application/vnd.google-apps.video",
    DriveSDK = "application/vnd.google-apps.drive-sdk",
}

namespace DriveMimeType {

    export function isAudio(mimeType: string): boolean {
        return mimeType == DriveMimeType.Audio;
    }

    export function isDocument(mimeType: string): boolean {
        return mimeType == DriveMimeType.Document;
    }

    export function isDrawing(mimeType: string): boolean {
        return mimeType == DriveMimeType.Drawing;
    }

    export function isFile(mimeType: string): boolean {
        return mimeType == DriveMimeType.File;
    }

    export function isFolder(mimeType: string): boolean {
        return mimeType == DriveMimeType.Folder;
    }

    export function isForm(mimeType: string): boolean {
        return mimeType == DriveMimeType.Form;
    }

    export function isMap(mimeType: string): boolean {
        return mimeType == DriveMimeType.Map;
    }

    export function isPhoto(mimeType: string): boolean {
        return mimeType == DriveMimeType.Photo;
    }

    export function isPresentation(mimeType: string): boolean {
        return mimeType == DriveMimeType.Presentation;
    }

    export function isScript(mimeType: string): boolean {
        return mimeType == DriveMimeType.Script;
    }

    export function isSite(mimeType: string): boolean {
        return mimeType == DriveMimeType.Site;
    }

    export function isSpreadSheet(mimeType: string): boolean {
        return mimeType == DriveMimeType.SpreadSheet;
    }

    export function isVideo(mimeType: string): boolean {
        return mimeType == DriveMimeType.Video;
    }

    export function isDriveSDK(mimeType: string): boolean {
        return mimeType == DriveMimeType.DriveSDK;
    }
}