import { ChangeDetectionStrategy, Component } from "@angular/core";
import { from, Observable } from "rxjs";

@Component({
        selector: "app-root",
        templateUrl: "./app.component.html",
        styleUrls: ["./app.component.scss"],
        changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
        title = "nm-cleaner";
        foldersPath: Observable<string>;

        async openSelectFolderDialog() {
                this.foldersPath = from(
                        window.electronAPI.openSelectFolderDialog()
                );
                // window.electronAPI.openSelectFolderDialog();
        }

        async scan() {
                console.log("window.electronAPI");
                console.log(window.electronAPI);
                window.electronAPI.scan("C:\\Projects");
                // console.log({ result });
        }
}
