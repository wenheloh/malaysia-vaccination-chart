<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
			width="150"
			:disable-resize-watcher="disableResizeWatcher"
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
					@click="onListItemClick"
				>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"/>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			:clipped-left="clipped"
			fixed
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
			<v-toolbar-title v-text="title"/>
			<v-spacer/>
		</v-app-bar>
		<v-main>
			<v-container>
				<Nuxt keep-alive />
			</v-container>
		</v-main>
		<v-footer
			:absolute="!fixed"
			app
		>
			<span>&copy; {{ new Date().getFullYear() }}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
			<span>Public data from <a href="https://github.com/CITF-Malaysia/citf-public" target="_blank"
									  title="CITF-Malaysia">CITF-Malaysia</a></span>
		</v-footer>
	</v-app>
</template>

<script>
import { DataSourceType } from "@/common/custom-typings";

export default {
	data() {
		return {
			clipped: false,
			drawer: false,
			fixed: true,
			items: Object.keys(DataSourceType).map(key => ({
				title: key.toLowerCase().split("_").reduce((result, current) => result += `${current.charAt(0).toUpperCase()}${current.substring(1)} `, "").trim(),
				to: DataSourceType[key]
			})),
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: process.env.projectName,
			disableResizeWatcher: true
		}
	},
	methods: {
		onListItemClick() {
			this.drawer = !this.drawer
		}
	}
}
</script>
