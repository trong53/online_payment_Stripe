///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
	var flex = document.createElement('div');
	flex.style.display = 'flex';
	flex.style.flexDirection = 'column';
	flex.style.rowGap = '1px';

	flex.appendChild(document.createElement('div'));
	flex.appendChild(document.createElement('div'));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;
	flex.parentNode.removeChild(flex);
	console.log(isSupported);

	if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

///////////////////////////////////////////
// SET CURRENT YEAR
const yearEL = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

////////////////////////////////////////////
// MAKE MOBILE NAVIGATION WORK
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
	headerEl.classList.toggle('nav-open');
});

////////////////////////////////////////////////
// MAKE SMOOTH SCROLLING NAVIGATION
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		const href = link.getAttribute('href');

		// scroll back to the top
		if (href === '#')
			window.scrollTo({
				top: 0,
				behaviour: 'smooth',
			});

		// scroll to other links
		if (href !== '#' && href.startsWith('#')) {
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({
				behaviour: 'smooth',
			});
		}

		// close mobile navigation
		if (link.classList.contains('main-nav-link'))
			headerEl.classList.toggle('nav-open');
	});
});

///////////////////////////////////////////////////
// STICKY NAVIGATION
const sectionFirstEl = document.querySelector('.section-first');

const obs = new IntersectionObserver(
	function (entries) {
		const ent = entries[0];
		console.log(ent);

		if (ent.isIntersecting === false) {
			document.body.classList.add('sticky');
		}

		if (ent.isIntersecting === true) {
			document.body.classList.remove('sticky');
		}
	},
	{
		// in the viewport
		root: null,
		threshold: 0,
		rootMargin: '-80px',
	}
);

obs.observe(sectionFirstEl);
