import { Component, ViewChild, ElementRef} from '@angular/core';

import { EmailValidator } from '@angular/forms';

import { Email }    from './email';

@Component({
	selector: 'email-form',
	templateUrl: 'app/email-form.component.html'
})

export class EmailFormComponent {

	@ViewChild('fileInput') fileInput:ElementRef;

	isFormValid:boolean = false;
	isUntouched:boolean = true;

	isValidEmail:boolean = true;
	isValidSubject:boolean = true;
	isValidMessage:boolean = true;

	dataUrls:string[] = [];
	model = new Email("", "", "");

	submitted = false;

	attachFile() {

	    this.fileInput.nativeElement.click();

	}

	onSubmit() { 
	
		if(this.isFormValid){
			this.submitted = true; 
			alert("Email sent");
		}

	}

	validateEmail(){

		if(this.isUntouched == true) this.isUntouched = false;
		var valid = true;
		this.model.to = this.model.to.replace(" ", "");
		console.log(this.model.to.split(','));
		var chunks = this.model.to.split(',')
		chunks.forEach((chunk)=>{
			if(/^\s*(?:\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}\b\s*)+$/.test(chunk) === false) valid = false;
		});
		this.isValidEmail = ((valid === true) && (this.model.to.length > 0));
		if(!this.isUntouched && this.isValidEmail && this.isValidSubject && this.validateMessage) this.isFormValid = true;

	}

	validateSubject(){

		if(this.isUntouched == true) this.isUntouched = false;
		this.isValidSubject = this.model.subject.length > 0 && this.model.subject.length < 101;
		if(!this.isUntouched && this.isValidEmail && this.isValidSubject && this.validateMessage) this.isFormValid = true;

	}

	validateMessage(){

		if(this.isUntouched == true) this.isUntouched = false;
		this.isValidMessage = this.model.message.length > 0;
		if(!this.isUntouched && this.isValidEmail && this.isValidSubject && this.validateMessage) this.isFormValid = true;
		console.log(this.isFormValid)
	}

	setDataUrls() {

		this.dataUrls = [];
		this.model.files.forEach((file) =>{
			if(file["size"]){
				var reader  = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => { this.dataUrls.push(reader.result); };
			}
		});

	};

	onAttachFile() {

		if(!this.model.files) this.model.files = [];
		var files = this.fileInput.nativeElement.files;
		for(var i in files) {
			if(files[i]["size"]) this.model.files.push(files[i]);
		}
		this.setDataUrls();

	}

	get diagnostic() { return JSON.stringify(this.model); }

}