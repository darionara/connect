import { customElement, property, state } from 'lit/decorators.js'
import { tailwindElement } from '../../../shared/tailwind.element'
import { LitElement, html } from 'lit'
import style from './nightly-all-wallets-selector.css'
import vector from '../../../static/svg/backButton.svg'
import search from '../../../static/svg/searchIcon.svg'
import foxSadGIF from '../../../static/gif/fox_sad.gif'

@customElement('nightly-all-wallets-selector')
export class NightlyAllWalletsSelector extends LitElement {
  static styles = tailwindElement(style)

  @property({ type: Function })
  showAllWallets!: () => void

  @property({ type: Function })
  onWalletClick!: (name: string) => void

  @property({ type: Array })
  get selectorItems(): { name: string; icon: string; status: string }[] {
    return this._selectorItems
  }

  set selectorItems(value: { name: string; icon: string; status: string }[]) {
    this._selectorItems = value
    this.filteredItems = value.filter((item) => {
      return item.name.toLowerCase().includes(this.searchText)
    })
  }

  private _selectorItems: { name: string; icon: string; status: string }[] = []

  @state()
  filteredItems: { name: string; icon: string; status: string }[] = []
  @state()
  searchText = ''

  render() {
    return html`
      <div class="walletSelectorButtons">
        <div class="headerContainer">
          <div class="buttonContainer">
            <button @click=${this.showAllWallets}>
              <img src=${vector} />
            </button>
          </div>
          <div class="textContainer">
            <span> All wallets </span>
          </div>
        </div>
        <div class="inputContainer">
          <div class="walletInputSearchContainer">
            <input
              placeholder="Search"
              class="walletInputSearch"
              @input=${this.handleSearchInput}
            />
            <img src="${search}" />
          </div>
        </div>
        ${this.filteredItems.length ? this.renderItems() : this.renderNotFoundIcon()}
      </div>
    `
  }

  renderNotFoundIcon() {
    return html`
      <div class="NotFoundContainer">
        <img src="${foxSadGIF}" alt="Not Found" class="NotFoundGif" />
        <span class="NotFoundHeading">Nothing found...</span>
        <span class="NotFoundInfo">Make sure you’ve typed the name correctly.</span>
      </div>
    `
  }

  renderItems() {
    return html`
      <div class="recentDetectedContainer">
        ${this.filteredItems.map((item) => {
          return html`
              <nightly-wallet-selector-item
                class="nightlyWalletSelectorItem"
                name=${item.name}
                icon=${item.icon}
                status=${item.status}
                @click=${() => this.onWalletClick(item.name)}
              ></nightly-wallet-selector-item>
          `
        })}
      </div>
    `
  }

  handleSearchInput(event: InputEvent) {
    const searchInput = event.target as HTMLInputElement
    const searchText = searchInput.value.toLowerCase()
    this.searchText = searchText

    this.filteredItems = this.selectorItems.filter((item) => {
      return item.name.toLowerCase().includes(searchText)
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-all-wallets-selector': NightlyAllWalletsSelector
  }
}