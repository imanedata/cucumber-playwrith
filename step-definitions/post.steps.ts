import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import CreatePost from '../pages/CreatePost';
import DashboardPage from '../pages/Dashboard'; 

let dashboardPage: DashboardPage;
let createPost: CreatePost;

Then('je creer un post avec {string} et {string} et je clique sur le bouton save', async function (title: string, content: string) {
    createPost = new CreatePost(this.page); 
    await createPost.createPost(title, content);
});

Then('je vois mon super post dans la liste des posts', async function () {
    dashboardPage = new DashboardPage(this.page); 
    await expect(await dashboardPage.isPostVisible('super titre')).toBe(true);
});