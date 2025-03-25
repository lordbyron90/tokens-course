import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';
import { platform } from 'os';

register(StyleDictionary, {
    withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
    const themes = await loader.load('/tokens');
    const globalTheme = themes.getThemeByName('global');

    const config = {
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/global/variables.css',
                        format: 'css/variables',
                    }
                ],
                transforms: [
                    'name/camel',
                    'ts/resolveMath',
                    'size/pxToRem'
                ]
            }
        }
    }

    globalTheme.addConfig(config).build();
}

run();
