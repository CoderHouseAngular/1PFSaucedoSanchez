import{NgModule} from "@angular/core"
import{MatTableModule} from "@angular/material/table"
import{MatButtonModule} from "@angular/material/button"
import{MatIconModule} from "@angular/material/icon"
import{MatSlideToggleModule } from "@angular/material/slide-toggle"


@NgModule({
    imports:[
MatTableModule,
MatButtonModule,
MatIconModule,
MatSlideToggleModule
    ],
    exports:[
MatTableModule,
MatButtonModule,
MatIconModule,
MatSlideToggleModule
    ]
})
export class MaterialModule{}