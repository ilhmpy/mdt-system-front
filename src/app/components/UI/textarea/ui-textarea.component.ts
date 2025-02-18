import { Component, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { WritableSignal, signal, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ui-textarea',
  standalone: false,
  templateUrl: './ui-textarea.component.html',
  styleUrl: './ui-textarea.component.scss'
})
export class UiTextareaComponent implements ControlValueAccessor {
    readonly value: WritableSignal<string> = signal<string>("");
    readonly isBackspacePressed: WritableSignal<boolean> = signal<boolean>(false);

    @Input() change: (...args: any[]) => void = () => {}
    @Input() errors: WritableSignal<boolean> = signal<boolean>(true);
    @Input() form: FormGroup;
    @Input() formValue: string = "";
    @Input() placeholder: string = "";
    @Input() maxLength: string = "";

    @ViewChild('textareaField') textareaElement!: ElementRef<HTMLInputElement>;

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

    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.onChange(input.value);
      this.change()
    }

    focus() {
      this.textareaElement.nativeElement.focus();
    }
}
