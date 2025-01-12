import { LitElement, PropertyValueMap, html } from 'lit'
import { tailwindElement } from '../../shared/tailwind.element'
import { customElement, property, state } from 'lit/decorators.js'
import { svgToBase64 } from '../../utils/images'
import { XMLOptions, generateQrCodeXml } from '@nightlylabs/qr-code'
import style from './nightly-mobile-qr.css'

@customElement('nightly-mobile-qr')
export class NightlyMobileQr extends LitElement {
  static styles = tailwindElement(style)

  @property({ type: String })
  sessionId = ''

  @property({ type: String })
  relay = ''

  @property({ type: String })
  chainName = ''

  @property({ type: Function })
  showAllWallets!: () => void

  @property({ type: Object })
  qrConfigOverride: Partial<XMLOptions> = {}

  @state()
  qrSource: string | undefined = undefined

  private updateQrSource = () => {
    if (this.sessionId)
      this.qrSource = svgToBase64(
        generateQrCodeXml(
          'nc:' +
            this.sessionId +
            '?network=' +
            this.chainName.replace(/\s/g, '') +
            '&relay=' +
            this.relay,
          {
            width: 500,
            height: 500,
            margin: 10,
            ...this.qrConfigOverride
          }
        )
      )
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.updateQrSource()
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(_changedProperties)

    this.updateQrSource()
  }

  render() {
    return html`
      <div class="nc_mobileQrWrapper">
        <div class="nc_mobileQrTopBar">
          <button class="nc_mobileQrBackButton" @click=${this.showAllWallets}></button>
          <span class="nc_mobileQrTitle"> QR Code </span>
          <div class="nc_mobileQrTopJustify"></div>
        </div>
        <img class="nc_mobileQrCode" src=${this.qrSource} />

        <div
          class="nc_mobileQrLoaderOverlay ${this.qrSource ? 'nc_mobileQrLoadedOverlayFadeOut' : ''}"
        >
          <button class="nc_mobileQrBackButtonLoader" @click=${this.showAllWallets}></button>
          <img
            src="https://registry.nightly.app/images/fox_sad.gif"
            alt="Loading"
            class="nc_mobileQrLoader"
          />
          <h3 class="nc_mobileQrLoaderLabel">Generating QR code...</h3>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-mobile-qr': NightlyMobileQr
  }
}
