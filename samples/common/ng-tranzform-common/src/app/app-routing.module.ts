import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamplesComponent } from './examples/examples.component';
import { AccordionExampleComponent } from './examples/accordion/accordion-example.component';
import { DropdownExampleComponent } from './examples/dropdown/dropdown-example.component';
import { FormFieldsExampleComponent } from './examples/form-fields/form-fields-example.component';
import { TabsExampleComponent, TabOneExampleComponent, TabTwoExampleComponent } from './examples/tabs';
import { WizardExampleComponent } from './examples/wizard/wizard-example.component';
import { UseComponent } from './examples/use/use.component';
import {RoleBasedAccessControlApi} from '@tranzform/client-authorization';
import {CanActivateViaAuthGuard} from './guard';
import { AccessCheckComponent} from './examples/access-check/access-check.component';

import { ClinicalComponent } from './examples/clinical.component';
import { EngageComponent } from './examples/engage.component';

export const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
  },
  {
    path: 'engage',
    component: EngageComponent,
    children: [{
      path: '',
      redirectTo: 'use',
      pathMatch: 'full',
    }, {
      path: 'dropdown',
      component: DropdownExampleComponent,
      data: {
        title: 'Dropdown',
      },
    }, {
      path: 'use',
      component: UseComponent,
      data: {
        title: 'Use',
        crumbs: [{
          text: 'Custom Breadcrumb',
          url: 'http://www.google.com',
        }],
      },
    }, {
      path: 'wizard',
      component: WizardExampleComponent,
      data: {
        title: 'Wizard',
      },
    }, {
      path: 'routing',
      loadChildren: 'app/examples/routing/routing-example.module#RoutingExampleModule',
      data: {
        title: 'Routing',
      },
    }],
  },
  {
    path: 'clinical',
    component: ClinicalComponent,
    children: [
      {
        path: '',
        redirectTo: '/clinical/use',
        pathMatch: 'full',
      }, {
        path: 'dropdown',
        component: DropdownExampleComponent,
        data: {
          title: 'Dropdown',
        },
      }, {
        path: 'formFields',
        component: FormFieldsExampleComponent,
        data: {
          title: 'Form Fields',
        },
      }, {
        path: 'tabs',
        component: TabsExampleComponent,
        data: {
          title: 'Tabs and Progress Bar',
        },
        children: [{
          path: '',
          redirectTo: '/clinical/tabs/(first//auxTabs:auxTab1)',
          pathMatch: 'full',
        }, {
          path: 'first',
          component: TabOneExampleComponent,
        }, {
          path: 'second',
          component: TabTwoExampleComponent,
        }, {
          path: 'auxTab1',
          component: TabOneExampleComponent,
          outlet: 'auxTabs',
          data: {
            title: 'Tabs and Progress Bar',
          }
        }, {
          path: 'auxTab2',
          component: TabTwoExampleComponent,
          outlet: 'auxTabs',
          data: {
            title: 'Tabs and Progress Bar',
          }
        }],
      }, {
        path: 'accordion',
        component: AccordionExampleComponent,
        data: {
          title: 'Accordion and Modal',
        },
      }, {
        path: 'use',
        component: UseComponent,
        data: {
          title: 'Use',
        },
      }, {
        path: 'accessCheck',
        component: AccessCheckComponent,
        data: {
          title: 'Access Check',
        },
      }, {
        path: 'wizard',
        component: WizardExampleComponent,
        data: {
          title: 'Wizard',
        },
      }, {
        path: 'routing',
        loadChildren: 'app/examples/routing/routing-example.module#RoutingExampleModule',
        data: {
          title: 'Routing',
        },
      }, {
        path: 'tables',
        loadChildren: 'app/examples/table/table-example.module#TableExampleModule',
        data: {
          title: 'Tables',
        },
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    RoleBasedAccessControlApi,
    CanActivateViaAuthGuard
  ]
})
export class AppRoutingModule { }
