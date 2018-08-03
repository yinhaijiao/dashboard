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

import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PortMapping} from '@api/backendapi';

const i18n = {
  /**
   @export {string} @desc Label 'None', which appears as an option in the service type
   selection box on the deploy page.
 */
  MSG_PORT_MAPPINGS_SERVICE_TYPE_NONE_LABEL: 'None',
  /**
   @export {string} @desc Label 'Internal', which appears as an option in the service type
   selection box on the deploy page.
 */
  MSG_PORT_MAPPINGS_SERVICE_TYPE_INTERNAL_LABEL: 'Internal',
  /**
   @export {string} @desc Label 'External', which appears as an option in the service type
   selection box on the deploy page.
 */
  MSG_PORT_MAPPINGS_SERVICE_TYPE_EXTERNAL_LABEL: 'External',
};

interface ServiceType {
  label: string;
  external: boolean;
}

const NO_SERVICE: ServiceType = {
  label: i18n.MSG_PORT_MAPPINGS_SERVICE_TYPE_NONE_LABEL,
  external: false
};

const INT_SERVICE: ServiceType = {
  label: i18n.MSG_PORT_MAPPINGS_SERVICE_TYPE_INTERNAL_LABEL,
  external: false
};

const EXT_SERVICE: ServiceType = {
  label: i18n.MSG_PORT_MAPPINGS_SERVICE_TYPE_EXTERNAL_LABEL,
  external: true
};

@Component(
    {selector: 'kd-port-mappings', templateUrl: './template.html', styleUrls: ['./style.scss']})
export class PortMappingsComponent implements OnInit {
  @Input() protocols: string[];

  /**
   * Available service types
   */
  serviceTypes: ServiceType[];

  /**
   * Selected service type. Binding to outer scope.
   */
  serviceType: ServiceType;

  /**
   * Binding to outer scope.
   */
  isExternal: boolean;

  /**
   * Two way data binding from the scope.
   */
  portMappings: PortMapping[] = [];

  // portMappingForm: FormGroup;

  constructor(private readonly fb_: FormBuilder) {
    this.serviceTypes = [NO_SERVICE, INT_SERVICE, EXT_SERVICE];
    this.serviceType = NO_SERVICE;

    // this.portMappingForm = this.fb_.group({
    //   port: ['', Validators.required],
    //   targetPort: ['', Validators.required],
    //   protocol: ['', Validators.required]
    // });
  }

  ngOnInit(): void {
    // console.log('this.protocols', this.protocols);
    // this.portMappingForm.get('protocol').setValue(this.protocols[0]);
  }

  changeServiceType(): void {
    // add or remove port mappings
    if (this.serviceType === NO_SERVICE) {
      this.portMappings = [];
    } else if (this.portMappings.length === 0) {
      // this.portMappingForm.get('protocol').setValue(this.protocols[0]);TODO:
      this.portMappings = [this.newEmptyPortMapping(this.protocols[0])];
    }

    // set flag
    this.isExternal = this.serviceType.external;
  }

  newEmptyPortMapping(defaultProtocol: string): PortMapping {
    return {port: null, targetPort: null, protocol: defaultProtocol};
  }

  /**
   * Call checks on port mapping:
   *  - adds new port mapping when last empty port mapping has been filled
   *  - validates port mapping
   * @param {!angular.FormController|undefined} portMappingForm
   * @param {number} portMappingIndex
   * @export
   */
  checkPortMapping(): void {
    // TODO: param portMappingIndex: number
    this.addProtocolIfNeeed();
    // this.validatePortMapping(portMappingIndex); TODO:
  }

  addProtocolIfNeeed(): void {
    const lastPortMapping = this.portMappings[this.portMappings.length - 1];
    if (this.isPortMappingFilled(lastPortMapping)) {
      this.portMappings.push(this.newEmptyPortMapping(this.protocols[0]));
    }
  }

  /**
   * Returns true when the given port mapping is filled by the user, i.e., is not empty.
   */
  isPortMappingFilled(portMapping: PortMapping): boolean {
    return !!portMapping.port && !!portMapping.targetPort;
  }

  /**
   * Validates port mapping. In case when only one port is specified it is considered as invalid.
   */
  validatePortMapping(portIndex: number): void {
    const portMapping = this.portMappings[portIndex];

    // let portElem = this.portMappingForm.get('port');
    // let targetPortElem = this.portMappingForm.get('targetPort');

    const isValidPort = this.isPortMappingFilledOrEmpty(portMapping) || !!portMapping.port;
    const isValidTargetPort =
        this.isPortMappingFilledOrEmpty(portMapping) || !!portMapping.targetPort;

    // portElem.$setValidity('empty', isValidPort);TODO:
    // targetPortElem.$setValidity('empty', isValidTargetPort);
  }

  /**
   * Returns true when the given port mapping is filled or empty (both ports), false otherwise.
   */
  isPortMappingFilledOrEmpty(portMapping: PortMapping): boolean {
    return !portMapping.port === !portMapping.targetPort;
  }

  isRemovable(index: number): boolean {
    return index !== (this.portMappings.length - 1);
  }

  remove(index: number): void {
    this.portMappings.splice(index, 1);
  }
}
