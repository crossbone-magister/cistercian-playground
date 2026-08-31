export type Theme = { name: string; color: string; backgroundColor: string };
export const THEMES: Theme[] = [
	{
		name: 'default',
		color: 'black',
		backgroundColor: 'white'
	},
	{
		name: 'sepia',
		color: '#CDA882',
		backgroundColor: '#EADBCB'
	},
	{
		name: 'dark',
		color: 'white',
		backgroundColor: 'black'
	},
	{
		name: 'crt',
		color: '#00FF33',
		backgroundColor: 'black'
	}
];

export const currentTheme = $state(THEMES.find((t) => t.name === 'default'));

export function changeTheme(name: string) {
	const newTheme = THEMES.find((t) => t.name === name);
	if (currentTheme !== undefined && newTheme !== undefined) {
		currentTheme.color = newTheme.color;
		currentTheme.backgroundColor = newTheme.backgroundColor;
		currentTheme.name = newTheme.name;
	}
}
