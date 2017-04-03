import {MasterPage} from "../pageObjects/masterPage";
import {expect} from 'chai';
import {consts} from '../consts';
import steps from "../steps/actionSteps"

describe('Main Page', () => {
    const master = new MasterPage();
    before(() => {
        steps.navigateTo(master.url);
    });

    it('Header should be visible', () => {
        expect(browser.isVisible(master.header)).to.be.true;
    });
});
