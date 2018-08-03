// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {HttpClient} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Namespace, NamespaceList, Protocols, SecretList} from '@api/backendapi';
import {StateService} from '@uirouter/core';
import {CreateService} from '../../../common/services/create/service';
import {HistoryService} from '../../../common/services/global/history';
import {NamespaceService} from '../../../common/services/global/namespace';
import {overviewState} from '../../../overview/state';
import {FormValidators} from './validators';

// TODO
@Component(
    {selector: 'kd-create-from-form', templateUrl: './template.html', styleUrls: ['./style.scss']})
export class CreateFromFormComponent implements OnInit {
  readonly nameMaxLength = 24;

  showMoreOptions_ = true;  // TODO false
  namespaces: string[];
  protocols: string[];
  secrets: string[];

  form: FormGroup;

  constructor(
      private readonly namespace_: NamespaceService, private readonly create_: CreateService,
      private readonly history_: HistoryService, private readonly http_: HttpClient,
      private readonly state_: StateService, private readonly fb_: FormBuilder) {
    this.form = this.fb_.group({
      name: ['', Validators.compose([Validators.required, FormValidators.namePattern])],
      ttt: ['', Validators.compose([Validators.required, FormValidators.isInteger])],
      containerImage: ['', Validators.required],
      replicas: ['', Validators.compose([Validators.required, FormValidators.isInteger])],
      description: [''],
      namespace: ['', Validators.required],
      imagePullSecret: [''],
      cpuRequirement: [''],
      memoryRequirement: [''],
      containerCommand: [''],
      containerCommandArgs: [''],
      runAsPrivileged: [''],
    });
    this.http_.get('api/v1/namespace').subscribe((result: NamespaceList) => {
      this.namespaces = result.namespaces.map((namespace: Namespace) => namespace.objectMeta.name);
      this.namespace.setValue(
          this.namespace_.areMultipleNamespacesSelected() ?
              this.state_.params.namespace || this.namespaces[0] :
              this.namespaces[0]);
    });
    // ,
    // err => {
    //     // TODO: log
    //     // console.log(err);
    // }
    this.http_.get('api/v1/appdeployment/protocols')
        .subscribe((protocols: Protocols) => this.protocols = protocols.protocols);
    // err => {
    //     // TODO: log
    //     // console.log(err);
    // }
  }

  ngOnInit(): void {}

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get ttt(): AbstractControl {
    return this.form.get('ttt');
  }

  get containerImage(): AbstractControl {
    return this.form.get('containerImage');
  }

  get replicas(): AbstractControl {
    return this.form.get('replicas');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get namespace(): AbstractControl {
    return this.form.get('namespace');
  }

  get imagePullSecret(): AbstractControl {
    return this.form.get('imagePullSecret');
  }

  get cpuRequirement(): AbstractControl {
    return this.form.get('cpuRequirement');
  }

  get memoryRequirement(): AbstractControl {
    return this.form.get('memoryRequirement');
  }

  get containerCommand(): AbstractControl {
    return this.form.get('containerCommand');
  }

  get containerCommandArgs(): AbstractControl {
    return this.form.get('containerCommandArgs');
  }

  get runAsPrivileged(): AbstractControl {
    return this.form.get('runAsPrivileged');
  }

  resetImagePullSecret(): void {
    this.imagePullSecret.setValue('');
  }

  isCreateDisabled(): boolean {
    return this.create_.isDeployDisabled();
  }

  getSecrets(): void {
    this.http_.get(`api/v1/secret/${this.namespace}`).subscribe((result: SecretList) => {
      this.secrets = result.secrets.map(secret => secret.objectMeta.name);
    });
  }

  create(): void {}

  cancel(): void {
    this.history_.goToPreviousState(overviewState.name);
  }

  areMultipleNamespacesSelected(): boolean {
    return this.namespace_.areMultipleNamespacesSelected();
  }

  /**
   * Returns true if more options have been enabled and should be shown, false otherwise.
   */
  isMoreOptionsEnabled(): boolean {
    return this.showMoreOptions_;
  }

  /**
   * Shows or hides more options.
   * @export
   */
  switchMoreOptions(): void {
    this.showMoreOptions_ = !this.showMoreOptions_;
  }

  // get namespace(): string {
  //   return this.namespace_.current();
  // }
}
