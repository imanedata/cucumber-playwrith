import { Page } from 'playwright';

class CreatePost {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    elements = {
        CreatepostButton: () => this.page.locator('a:has-text("Add")'),
        TitleInpute : () => this.page.locator('input[name="title"]'),
        ContentInpute : () => this.page.getByRole('textbox', { name: 'content:' }),
        SubmitButton : () => this.page.getByRole('button', { name: 'Save', exact: true })

    };

    async createPost(title: string, content: string) {
        await this.elements.TitleInpute().fill(title);
        await this.elements.ContentInpute().fill(content);
        await this.elements.SubmitButton().click();
    }
}

export default CreatePost;
