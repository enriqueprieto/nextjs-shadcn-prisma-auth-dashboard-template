import EnLocale from "../../src/locales/en.json";
import PtLocale from "../../src/locales/pt.json";

const locales = {
    en: {
        locale: EnLocale
    },
    pt: {
        locale: PtLocale
    }
} as const;
const localeDefault = 'en';

describe('Homepage', () => {

    it('should home page content has already loaded.', () => {
        cy.visit('/');
    });

    describe('i18n tests', () => {
        Object.keys(locales).forEach((key) => {
            it(`should load content with ${key} as NEXT_LOCALE cookie value`, () => {
                cy.setCookie('NEXT_LOCALE', key);
                cy.visit('/');
                const locale = locales[key as keyof typeof locales];
                const basePath = key === localeDefault ? "/" : `/${key}`;

                cy.location('pathname').should('equal', basePath);
                cy.findByRole('heading', { 
                        level: 1
                    })
                    .should('exist')
                    .should('have.text', locale.locale.Home.title);
                cy.findByRole('paragraph')
                    .should('exist')
                    .should('have.text', locale.locale.Home.description);

                cy.findByRole('link', { name: locale.locale.common.dashboard_button_label })
                    .should('exist')
                    .should(
                        'have.attr', 
                        "href", 
                        key === localeDefault ? "/dashboard" : `${basePath}/dashboard`
                    )
                    .should('not.have.attr', 'target', "_blank");
            });
        });
    })
});