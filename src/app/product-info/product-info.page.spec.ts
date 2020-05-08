import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductInfoPage } from './product-info.page';

describe('ProductInfoPage', () => {
  let component: ProductInfoPage;
  let fixture: ComponentFixture<ProductInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
