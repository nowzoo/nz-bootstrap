

export const NzbPlacements = {
	top: 'top',
	bottom: 'bottom',
	left: 'left',
	right: 'right',
	auto: 'auto'
}

export const NzbTriggers = {
	manual: 'manual',
	click: 'click',
	focus: 'focus',
	mousein: 'mousein',
	blur: 'blur',
	mouseout: 'mouseout',
	focusout: 'focusout'

}

export const NzbShowTriggers = [
	NzbTriggers.manual, NzbTriggers.click, NzbTriggers.focus, NzbTriggers.mousein
];

export const NzbHideTriggers = [
	NzbTriggers.manual, NzbTriggers.click, NzbTriggers.blur, NzbTriggers.mouseout, NzbTriggers.focusout
];
