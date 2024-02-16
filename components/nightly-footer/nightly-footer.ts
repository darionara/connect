import { customElement, property } from 'lit/decorators.js'
import { tailwindElement } from '../../shared/tailwind.element'
import style from './nightly-footer.css'
import { LitElement, html } from 'lit'

@customElement('nightly-footer')
export class NightlyFooter extends LitElement {
  static styles = tailwindElement(style)

  @property({ type: String })
  termsOfServiceLink = '#'

  @property({ type: String })
  privacyPolicyLink = '#'

  render() {
    return html`
      <div class="nc_footer">
        <p class="nc_footerText">
          By connecting, you agree to Common's
          <a
            href="{this.termsOfServiceLink}"
            target="_blank"
            rel="noopener noreferrer"
            class="nc_footerLink"
            >Terms of Service</a
          >
          and to its
          <a
            href="{this.privacyPolicyLink}"
            target="_blank"
            rel="noopener noreferrer"
            class="nc_footerLink"
            >Privacy Policy</a
          >.
        </p>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-footer': NightlyFooter
  }
}
