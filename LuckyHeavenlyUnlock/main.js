Game.registerMod("NoLuckySevens", {
	init: function () {
		Game.Notify("No Lucky 7s Requirement", "Mod active. Lucky upgrades will show properly.", [30, 7]);

		// Wait until all upgrades are created
		const mod = this;
		mod.tryPatchLuckyUpgrades = function () {
			const U = Game.Upgrades;

			if (U["Lucky digit"] && U["Lucky number"] && U["Lucky payout"]) {
				U["Lucky digit"].showIf = function () {
					return Game.Has("Heavenly luck");
				};

				U["Lucky number"].showIf = function () {
					return Game.Has("Lucky digit") && Game.Has("Lasting fortune");
				};

				U["Lucky payout"].showIf = function () {
					return Game.Has("Lucky number") && Game.Has("Decisive fate");
				};

				console.log("[NoLuckySevens] Patched .showIf functions for Lucky upgrades.");
				return true;
			}
			return false;
		};

		// Try immediately and then retry until upgrades are ready
		if (!mod.tryPatchLuckyUpgrades()) {
			const interval = setInterval(() => {
				if (mod.tryPatchLuckyUpgrades()) clearInterval(interval);
			}, 500);
		}
	},

	save: function () {
		return "";
	},

	load: function () {
		// Rebuild ascend tree in case this was loaded into an existing save
		Game.BuildAscendTree();
	}
});
