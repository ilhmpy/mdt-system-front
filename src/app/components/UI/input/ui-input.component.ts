import { Component, forwardRef, HostListener, Input, signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: false,
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true
    }
  ]
})
export class UiInputComponent implements ControlValueAccessor {
    readonly value: WritableSignal<string> = signal<string>("");
    readonly isBackspacePressed: WritableSignal<boolean> = signal<boolean>(false);

    @Input() change: (...args: any[]) => void = () => {}
    @Input() errors: WritableSignal<boolean> = signal<boolean>(true);
    @Input() form: FormGroup;
    @Input() formValue: string = "";
    @Input() placeholder: string = "";
    @Input() mask: boolean = false;
    @Input() maskData: string = "";
    @Input() maxLength: string = "25"

    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({})
    }
    
    onChange(value: string): void {}

    onTouched(): void {}

    writeValue(valueObj: any): void {
      if (valueObj !== undefined) {
        this.value.set(valueObj)
      }
    }

    registerOnChange(fn: any): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    keydown(event: KeyboardEvent) {
      if (event.key == "Backspace") {
        this.isBackspacePressed.set(true);
      }
    }

    unexpectedChange(event: any) {
      if (this.mask) {
        event.preventDefault();
      }
    }

    @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
      this.unexpectedChange(e)
    }
  
    @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
      this.unexpectedChange(e)
    }
  
    @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
      this.unexpectedChange(e)
    }

    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.onChange(input.value);

      this.errors.set(!!this.form.get(this.formValue)?.errors);
  
      if (this.mask) {
        if (
          (this.isBackspacePressed() && this.maskData.split("").every(char => input.value.includes(char))) || 
          !(input.value.includes(this.maskData))
        ) {
          this.form.patchValue({
            [this.formValue]: this.maskData
          });

          this.isBackspacePressed.set(false);
        } else {
          this.form.patchValue({
            [this.formValue]: /^\d+$/.test(input.value.slice(-1)) ? input.value : input.value.slice(0, -1)
          })
        }
      } else {
        this.change(this.errors);
      }
    }
}
