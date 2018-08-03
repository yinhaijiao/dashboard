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

import {Component} from '@angular/core';

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

@Component(
    {selector: 'kd-deploy-label', templateUrl: './template.html', styleUrls: ['./style.scss']})
export class DeployLabelComponent {
  constructor() {}
}
