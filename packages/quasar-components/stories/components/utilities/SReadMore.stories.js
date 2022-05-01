import SReadMore from '../../../src/components/SReadMore.vue'

export default {
	component: SReadMore,
	title: 'Components/Utilities/SReadMore',
	args: {
		link: false
	},
	parameters: {
		docs: {
			source: {
				code: '<s-readmore>...</s-readmore>'
			}
		}
	}
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra mi est, vel dictum massa eleifend et. Cras leo diam, gravida sed commodo ac, interdum in odio. Praesent tortor eros, ultricies vel erat non, interdum cursus diam. Ut ullamcorper lorem sed libero convallis, dignissim auctor felis congue. Pellentesque rhoncus nisl mattis odio ullamcorper pretium. Morbi ullamcorper, eros nec scelerisque laoreet, nunc ipsum feugiat neque, sagittis congue eros massa eu sem. Pellentesque bibendum augue ut gravida laoreet. Nam ultrices sagittis purus, in tincidunt tellus vehicula sed. Phasellus ac neque sit amet neque blandit scelerisque. Aenean pellentesque ornare risus vel feugiat. Praesent vitae consequat urna. Integer posuere vehicula quam a imperdiet. Nam lobortis sapien consectetur arcu finibus, eget elementum est volutpat. Integer luctus posuere augue, at porta sem rutrum id. Nunc ultrices vel sapien at dictum. Ut at aliquam eros.\n      Ut aliquam arcu auctor ex iaculis, sed faucibus augue rhoncus. Pellentesque volutpat pellentesque ligula, id aliquet risus congue ac. Praesent euismod erat fermentum elit tempor interdum. Cras dui dolor, volutpat non dui vel, facilisis imperdiet nibh. Suspendisse maximus sollicitudin lorem eu tincidunt. Vivamus sed interdum neque. Morbi sagittis mauris leo, nec auctor sapien sodales rutrum. Sed non semper turpis, non porttitor est. Sed tempor lorem quis dui semper, vel imperdiet diam commodo. Nullam vel pulvinar eros. Curabitur at augue eget dui eleifend feugiat. Ut iaculis purus at nisl faucibus, at maximus dolor pulvinar. Curabitur finibus at libero eu malesuada. Sed eget pretium metus, non facilisis ipsum.\n      Nunc eu condimentum tortor, non tempus magna. Aliquam sit amet elit a lorem tincidunt fringilla vel in nisl. Aenean dapibus, lorem vel pretium mattis, ex dolor imperdiet est, quis ullamcorper nisi dui viverra leo. Maecenas sed cursus magna. Etiam lacinia est eu tellus mollis, a euismod risus venenatis. Maecenas ullamcorper eros quis leo elementum tincidunt eget nec nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Sed scelerisque dui lectus, condimentum rutrum nisi auctor a. Aliquam erat volutpat. Integer pretium turpis et ligula blandit, quis fringilla est ullamcorper. Aliquam vitae justo hendrerit, blandit ante eu, malesuada orci. Quisque orci libero, fringilla vel nisi eget, aliquet pharetra purus. Fusce dui nulla, cursus ac nibh in, sollicitudin imperdiet nibh. Pellentesque imperdiet vehicula leo, in lacinia ipsum fermentum quis.\n      Morbi gravida, mi sit amet porta congue, justo diam pulvinar libero, in interdum purus libero quis lectus. Curabitur at mauris iaculis, finibus justo id, faucibus neque. Phasellus sed purus tortor. Vestibulum sit amet orci a quam mattis ultrices in fermentum risus. Aenean in mollis metus. Maecenas fermentum turpis eget cursus ornare. Suspendisse et lorem non eros tempor molestie. Sed mattis, diam viverra scelerisque efficitur, felis urna bibendum magna, sit amet vulputate ante eros nec leo. Proin aliquet sed neque in porta. Nulla et sem ut velit commodo maximus. Pellentesque dictum purus ipsum, ac gravida lectus hendrerit fermentum. Donec viverra ullamcorper purus at tincidunt. Maecenas in porttitor est. Fusce pretium semper nisl, sit amet imperdiet libero sollicitudin ac.\n      Sed iaculis semper erat. Morbi mi ante, ornare id molestie a, tempus quis dolor. Proin ut enim tristique, molestie velit et, consequat est. Vestibulum vulputate felis ornare nibh tincidunt interdum. Mauris hendrerit diam et erat posuere hendrerit. Nulla consectetur erat eu imperdiet pulvinar. Fusce vitae risus quis elit molestie vestibulum. Sed a ligula nibh. Praesent suscipit nibh vitae rutrum placerat. Nam eget consequat metus. Morbi a nulla tortor. Nam tempor molestie tortor, vitae molestie sapien iaculis at. Fusce quis arcu quam. Aliquam rhoncus vitae est nec vulputate. Aliquam sem ipsum, porttitor ut sapien sit amet, rutrum scelerisque nibh. Nunc pharetra sem felis, id varius dolor sagittis id.'

const Template = (args) => ({
	components: {SReadMore},
	setup() {
		return {args}
	},
	template: '<s-read-more v-bind="args">' + lorem + '</s-read-more>'
})

export const Basic = Template.bind({})
Basic.parameters = {}

export const Link = Template.bind({})
Link.args = {
	link: true
}
