const EasyPopups = (function() {

	const triggerKey  = "ptarget";
	const targetKey   = "popup";
	const wrapperKey  = "pid";
	const templateKey = "ptype";
	const titleKey    = "ptitle";

	const toDatasetKey = key => key.replace(/(-[a-z])/g, char => char.charAt(1).toUpperCase());

	class PopupManager {

		constructor() {
			this.triggers = document.querySelectorAll(`*[data-${triggerKey}]`);
			this.popups = this.buildPopups();
			this.bindTriggers();
			this.bindEvents();
		}

		buildPopups() {
			return Array.prototype.reduce.call(this.triggers, (popups, trigger) => {
				const id = trigger.dataset[toDatasetKey(triggerKey)];
				return (popups[id] = new Popup(trigger)) && popups;
			}, {});
		}

		bindTriggers() {
			this.triggers.forEach(trigger => {
				trigger.addEventListener("click", () => {
					this.popups[trigger.dataset[toDatasetKey(triggerKey)]].open();
				})
			});
		}

		bindEvents() {

			const containsClass = (element, classes) => {
				return classes.reduce((res, current) => {
					return res || element.classList.contains(current);
				}, false);
			};

			document.addEventListener("click", event => {
				const target = event.target;

				//Closing popup
				if (containsClass(target, ["popup-wrapper", "close", "times"]) && !event.button) {
					const wrapper = document.querySelector(".popup-wrapper");
					this.popups[wrapper.dataset[toDatasetKey(wrapperKey)]].close();
				}
			});
		}
	}

	class Popup {

		constructor(trigger) {

			this.id = trigger.dataset[toDatasetKey(triggerKey)];
			this.target = document.querySelector(`[data-${targetKey}="${this.id}"]`);
			this.title = this.target.dataset[toDatasetKey(titleKey)] || null;

			const type = this.target.dataset[toDatasetKey(templateKey)];
			this.popup = this.build(type);
		}

		open() {
			document.body.appendChild(this.popup);
			setTimeout(() => {
				this.popup.style.opacity = 0.7;
			}, 16);
		}

		close() {
			this.popup.style.opacity = 0;
			setTimeout(() => {
				try {
					document.body.removeChild(this.popup);
				} catch (exception) {
					console.warn("Popup was already removed. " + exception);
				}
			}, 400);
		}

		static getTemplate(type) {
			return {
				"simple": `
					 <div class="header">
						{title}
						<div class="close">
							<span class="times">&times;</span>
						</div>
					</div>
					<div class="body">
						{content}
					</div>
				`,
				"info": `
					 <div class="header">
					 	<div class="info">
					 		<span class="i">i</span>
						</div>
						{title}
						<div class="close">
							<span class="times">&times;</span>
						</div>
					</div>
					<div class="body">
						{content}
					</div>
				`

			}[type];
		}

		build(type) {

			const p = document.createElement("div");
			p.classList.add("popup-wrapper");
			p.setAttribute(`data-${wrapperKey}`, this.id);

			const mapping = {
				"{template}": type ? Popup.getTemplate(type) : this.target.innerHTML,
				"{title}"   : this.title,
				"{content}" : this.target.innerHTML
			};

			let template = `<div class="popup-content">{template}</div>`;

			for (let variable in mapping) {
				if (mapping.hasOwnProperty(variable)) {
					template = template.replace(variable, mapping[variable] || "");
				}
			}

			p.innerHTML = template;
			return p;
		}
	}

	return new PopupManager();

})();
