(function(){"use strict";var e=typeof window=="undefined"?global:window;if(typeof e.require=="function")return;var t={},n={},r={}.hasOwnProperty,i={},s=function(e,t){return e.indexOf(t,e.length-t.length)!==-1},o=function(e,t){var n=0;t&&(t.indexOf(!1)&&(n="components/".length),t.indexOf("/",n)>0&&(t=t.substring(n,t.indexOf("/",n))));var r=i[e+"/index.js"]||i[t+"/deps/"+e+"/index.js"];return r?"components/"+r.substring(0,r.length-".js".length):e},u=function(){var e=/^\.\.?(\/|$)/;return function(t,n){var r=[],i,s;i=(e.test(n)?t+"/"+n:n).split("/");for(var o=0,u=i.length;o<u;o++)s=i[o],s===".."?r.pop():s!=="."&&s!==""&&r.push(s);return r.join("/")}}(),a=function(e){return e.split("/").slice(0,-1).join("/")},f=function(t){return function(n){var r=u(a(t),n);return e.require(r,t)}},l=function(e,t){var r={id:e,exports:{}};return n[e]=r,t(r.exports,f(e),r),r.exports},c=function(e,i){var s=u(e,".");i==null&&(i="/"),s=o(e,i);if(r.call(n,s))return n[s].exports;if(r.call(t,s))return l(s,t[s]);var a=u(s,"./index");if(r.call(n,a))return n[a].exports;if(r.call(t,a))return l(a,t[a]);throw new Error('Cannot find module "'+e+'" from '+'"'+i+'"')};c.alias=function(e,t){i[t]=e},c.register=c.define=function(e,n){if(typeof e=="object")for(var i in e)r.call(e,i)&&(t[i]=e[i]);else t[e]=n},c.list=function(){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e},c.brunch=!0,e.require=c})(),require.register("collections/folders",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return i(n,e),n.prototype.model=t("../models/folder"),n.prototype.url="folders/",n.prototype.comparator=function(e,t){return e.getFullPath().localeCompare(t.getFullPath())},n.prototype.getAllPaths=function(){return this.models.map(function(e){return{path:e.getFullPath(),id:e.get("id")}})},n}(Backbone.Collection)}),require.register("collections/konnectors",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return i(n,e),n.prototype.model=t("../models/konnector"),n.prototype.url="konnectors/",n.prototype.comparator=function(e,t){return e.isConfigured()&&!t.isConfigured()?-1:!e.isConfigured()&&t.isConfigured()?1:e.get("name")>t.get("name")?1:e.get("name")<t.get("name")?-1:0},n}(Backbone.Collection)}),require.register("initialize",function(e,t,n){var r,i,s,o,u,a;a=t("./lib/request"),o=t("./realtime"),s=t("../collections/konnectors"),i=t("../collections/folders"),r=t("./views/app_view"),u=t("./router"),$(function(){var e,n,a,f,l,c,h,p,d,v;h=window.locale,d=new Polyglot;try{p=t("locales/"+h)}catch(m){n=m,h="en",p=t("locales/en")}return d.extend(p),window.t=d.t.bind(d),l=window.initKonnectors||[],f=window.initFolders||[],c=new s(l),a=new i(f),v=new o,v.watch(c),v.watch(a),e=new r({collection:c,folders:a}),e.render(),window.router=new u({appView:e}),Backbone.history.start()})}),require.register("lib/base_view",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.template=function(){},t.prototype.initialize=function(){},t.prototype.getRenderData=function(){var e;return{model:(e=this.model)!=null?e.toJSON():void 0}},t.prototype.render=function(){return this.beforeRender(),this.$el.html(this.template(this.getRenderData())),this.afterRender(),this},t.prototype.beforeRender=function(){},t.prototype.afterRender=function(){},t.prototype.destroy=function(){return this.undelegateEvents(),this.$el.removeData().unbind(),this.remove(),Backbone.View.prototype.remove.call(this)},t}(Backbone.View)}),require.register("lib/request",function(e,t,n){var r;n.exports=r={request:function(e,t,n,r){return $.ajax({type:e,url:t,data:n!=null?JSON.stringify(n):null,contentType:"application/json",dataType:"json",success:function(e){if(r!=null)return r(null,e)},error:function(e){if(e!=null&&e.msg!=null&&r!=null)return r(new Error(e.msg));if(r!=null)return r(new Error("Server error occured"))}})},get:function(e,t){return r.request("GET",e,null,t)},postr:function(e,t,n){return r.request("POST",e,t,n)},put:function(e,t,n){return r.request("PUT",e,t,n)},del:function(e,t){return r.request("DELETE",e,null,t)}}}),require.register("lib/view_collection",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u={}.hasOwnProperty;r=t("lib/base_view"),n.exports=i=function(e){function t(){return this.fetch=s(this.fetch,this),this.removeItem=s(this.removeItem,this),this.addItem=s(this.addItem,this),t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.itemview=null,t.prototype.views={},t.prototype.template=function(){return""},t.prototype.itemViewOptions=function(){},t.prototype.collectionEl=null,t.prototype.onChange=function(){return this.$el.toggleClass("empty",_.size(this.views)===0)},t.prototype.appendView=function(e){return this.$collectionEl.append(e.el)},t.prototype.initialize=function(){return t.__super__.initialize.apply(this,arguments),this.views={},this.listenTo(this.collection,"reset",this.onReset),this.listenTo(this.collection,"add",this.addItem),this.listenTo(this.collection,"remove",this.removeItem),this.listenTo(this.collection,"sort",this.render),this.$collectionEl=$(this.collectionEl)},t.prototype.render=function(){var e,n,r;n=this.views;for(e in n)r=n[e],r.$el.detach();return t.__super__.render.apply(this,arguments)},t.prototype.afterRender=function(){var e,t,n;t=this.views;for(e in t)n=t[e],this.appendView(n.$el);return this.onReset(this.collection),this.onChange(this.views)},t.prototype.remove=function(){return this.onReset([]),t.__super__.remove.apply(this,arguments)},t.prototype.onReset=function(e){var t,n,r;n=this.views;for(t in n)r=n[t],r.remove();return e.forEach(this.addItem)},t.prototype.addItem=function(e){var t,n;return t=_.extend({},{model:e},this.itemViewOptions(e)),n=new this.itemview(t),this.views[e.cid]=n.render(),this.appendView(n),this.onChange(this.views)},t.prototype.removeItem=function(e){return this.views[e.cid].remove(),delete this.views[e.cid],this.onChange(this.views)},t.prototype.fetch=function(e){return this.collection.fetch(e)},t}(r)}),require.register("locales/en",function(e,t,n){n.exports={"bad credentials":"Bad Credentials","no bills retrieved":"No bills retrieved","key not found":"Key not found","last import:":"Last import:","save and import":"Save and import","auto import":"Automatic import","imported data:":"Imported data:","importing...":"importing...","no import performed":"No import performed","import already running":"Import is already running.",firstname:"Firstname",lastname:"Lastname",login:"Login",password:"Password",email:"Email",accessToken:"Access token",accessTokenSecret:"Access token secret",consumerKey:"Consumer Key",consumerSecret:"Consumer Secret",apikey:"Api key",phoneNumber:"Phone number",folderPath:"Folder path",none:"None","every hour":"Every hour","every day":"Every day","every week":"Every week","each month":"Each month","date format":"LLL","home headline":"With Konnectors you can retrieve many data and save them into your Cozy.\nFrom your phone bills to your connected scale, or your tweets. Configure the connectors you are interested in:","home config step 1":"Select a connector in the menu on the left","home config step 2":"Follow the instructions to configure it","home config step 3":"Your data are retrieved and saved into your Cozy","home more info":"More information:","home help step 1":"You must manually trigger the import, except if you enable the auto-import.","notification import error":"an error occurred during import of data","error occurred during import.":"An error occurred during the last import.","error occurred during import:":"An error occurred during the last import:","import server error":"Server error occured while importing.","konnector description free":"Download all your internet bills from Free. This konnector requires the Files application to store the bill PDF files.","konnector description free mobile":"Download all your phone bills from Free Mobile. This konnector requires the Files application to store the bill PDF files.","konnector description bouygues":"Download all your phone bills from Bouygues Telecom. This konnector requires the Files application to store the bill PDF files.","konnector description bouygues box":"Download all your internet bills from Bouygues Telecom. This konnector requires the Files application to store the bill PDF files.","konnector description github":"Download all your Github Bills. This konnector requires the Files application to store the bill PDF files.","konnector description github commits":"Save infos from all your Github Commits.","konnector description jawbone":"Download Move and Sleep Data from Jawbone CSV file.","konnector description rescuetime":"Download all your activities from Rescue Time","konnector description withings":"Download all your measures from your Withings account.","konnector description twitter":'Download all your tweets published on Twitter. This konnector requires two\nidentifiers and two secret keys. They can be generated on the <a\nhref="https://apps.twitter.com/">Twitter app dashboard</a>. There you will\nbe able to create an app. They will give you credentials for this app. The\ncurrent konnector will use them to connect to Twitter and fetch your data.',"konnector description digital ocean":"Download all your Digital Ocean Bills. This konnector requires the Files application to store the bill PDF files.","konnector description sosh":"Download all your Sosh Bills. This konnector requires the Files application to store the bill PDF files.","konnector description electrabel":"Download all you Electrabel Bills. This konnector requires the Files application to store the bill PDF files.","konnector description orange":"Download all your Orange Bills. This konnector requires the Files application to store the bill PDF files.","konnector description nest":"Save current temperature measured by your Nest thermostat.","konnector description numericable":"Download all your Numéricable Bills. This konnector requires the Files application to store the bill PDF files.","konnector description virginmobile":"Download all your Virgin Mobile  bills. This konnector requires the Files application to store the bill PDF files.","notification prefix":"Konnector %{name}:","notification github commits":"%{smart_count} new commit imported |||| %{smart_count} new commits imported","notification twitter":"%{smart_count} new tweet imported |||| %{smart_count} new tweets imported","notification free":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification github":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification jawbone":"%{smart_count} new measure imported |||| %{smart_count} new measures imported","notification rescuetime":"%{smart_count} new activity imported |||| %{smart_count} new activites imported","notification withings":"%{smart_count} new measure imported |||| %{smart_count} new measures imported","notification free mobile":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification digital ocean":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification sosh":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification electrabel":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification numericable":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","notification virginmobile":"%{smart_count} new invoice imported |||| %{smart_count} new invoices imported","konnector danger zone":"Danger zone","konnector delete credentials":"Delete this configuration.","konnector deleted":"The konnector configuration was successfully deleted.","konnector deletion error":"An error occured while deleting this konnector configuration."}}),require.register("locales/fr",function(e,t,n){n.exports={"bad credentials":"Mauvais identifiants","no bills retrieved":"Pas de factures trouvées","key not found":"Clé non trouvée","last import:":"Dernière importation :","save and import":"Sauvegarder et importer","auto import":"Importation automatique","imported data:":"Données importées :","importing...":"importation en cours...","no import performed":"Pas d'importation effectuée","import already running":"L'import est déjà en cours.",firstname:"Prénom",lastname:"Nom",login:"Identifiant",password:"Mot de passe",email:"Mail",accessToken:"Access token",accessTokenSecret:"Access token secret",consumerKey:"Consumer Key",consumerSecret:"Consumer Secret",apikey:"Api key",phoneNumber:"Numéro de téléphone",folderPath:"Chemin du dossier",none:"Aucun","every hour":"Toutes les heures","every day":"Tous les jours","every week":"Toutes les semaines","each month":"Tous les mois","date format":"DD/MM/YYYY [à] HH[h]mm","home headline":"Konnectors vous permet de récupérer de nombreuses données et de les intégrer à votre Cozy.\nDe vos factures de téléphone aux données de votre balance connectée en passant par vos tweets. Configurez les connecteurs qui vous intéressent :","home config step 1":"Sélectionnez un connecteur dans le menu à gauche","home config step 2":"Suivez les instructions pour le configurer","home config step 3":"Vos données sont récupérées et intégrer à votre Cozy","home more info":"Quelques informations supplémentaires :","home help step 1":"Vous devez manuellement déclencher l'importation sauf si vous avez activé l'importation automatique","notification import error":"une erreur est survenue pendant l'importation des données","error occurred during import.":"Une erreur est survenue lors de la dernière importation.","error occurred during import:":"Une erreur est survenue lors de la dernière importation :","import server error":"L'import a rencontré une erreur serveur.","konnector description free":"Téléchargez toutes vos factures internet de Free. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description free mobile":"Téléchargez toutes vos factures Free Mobile. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description bouygues":"Téléchargez toutes vos factures téléphones de Bouygues Telecom. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description bouygues box":"Téléchargez toutes vos factures internet de Bouygues Telecom. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description github":"Téléchargez toutes vos factures Github. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description github commits":"Sauvegardez les informations de tous vos commits Github.","konnector description jawbone":"Téléchargez les données de déplacement et de sommeil depuis un fichier CSV Jawbone.","konnector description rescuetime":"Téléchargez toutes vos activités RescueTime.","konnector description withings":"Téléchargez toutes les mesures de vos appareils Withings.","konnector description twitter":'Téléchargez tous vos tweets publiés sur Twitter. Ce connecteur requiert\ndeux identifiants et deux clés secrètes. Vous pouvez les générer via le\n<a href="https://apps.twitter.com/">tableau Twitter de gestion\nd\'applications</a>. Vous pourrez y créer une application. Twitter vous\nfournira des identifiants pour cette application. Avec ces identifiants\nce connecteur pourra récupérer vos données.',"konnector description digital ocean":"Téléchargez toutes vos factures Digital Ocean. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description sosh":"Téléchargez toutes vos factures Sosh. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description electrabel":"Téléchargez toutes vos factures Electrabel. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description orange":"Téléchargez toutes vos factures Orange. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description numericable":"Téléchargez toutes vos factures Numéricable. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description virgimobile":"Téléchargez toutes vos factures Virgin Mobile. Pour pouvoir stocker les factures au format PDF, ce connecteur requiert que l'application Files soit installée sur votre Cozy.","konnector description nest":"Enregistrez la température actuelle mesurée par votre Nest.","notification prefix":"Konnector %{name} :","notification github commits":"%{smart_count} nouveau commit importé |||| %{smart_count} nouveaux commits importés","notification twitter":"%{smart_count} nouveau tweet importé |||| %{smart_count} nouveaux tweets importés","notification free":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification github":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification jawbone":"%{smart_count} nouvelle mesure importée |||| %{smart_count} nouvelles mesures importées","notification rescuetime":"%{smart_count} nouvelle activité importée |||| %{smart_count} nouvelles activités importées","notification withings":"%{smart_count} nouvelle mesure importée |||| %{smart_count} nouvelles mesures importées","notification free mobile":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification digital ocean":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification sosh":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification electrabel":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification numericable":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","notification virginmobile":"%{smart_count} nouvelle facture importée |||| %{smart_count} nouvelles factures importées","konnector danger zone":"Zone dangereuse","konnector delete credentials":"Supprimer cette configuration.","konnector deleted":"La configuration de ce connecteur a bien été supprimée.","konnector deletion error":"Une erreur est survenue lors de la suppression de la configuration de ce connecteur."}}),require.register("models/folder",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.rootUrl="folders/",t.prototype.url=function(){return"folders/"+this.get("id")},t.prototype.getFullPath=function(){return this.get("path")+"/"+this.get("name")},t}(Backbone.Model)}),require.register("models/konnector",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.rootUrl="konnectors/",t.prototype.url=function(){return"konnectors/"+this.get("id")},t.prototype.isConfigured=function(){var e,t,n,r,i,s,o,u;n=this.get("fieldValues")||{},r=this.get("fields"),s=Object.keys(n).length,o=Object.keys(r).length,i=!0;for(e in r)t=r[e],i=i&&((u=n[e])!=null?u.length:void 0)>0;return s>=o&&i},t}(Backbone.Model)}),require.register("realtime",function(e,n,r){var i,s,o,u=function(e,t){function r(){this.constructor=e}for(var n in t)a.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},a={}.hasOwnProperty;s=n("../models/konnector"),i=n("../models/folder"),r.exports=o=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.models={konnector:s,folder:i},n.prototype.events=["konnector.update","folder.create","folder.update","folder.delete"],n.prototype.onRemoteUpdate=function(e){var n,r,s,o,u,a;return(e!=null?(u=e.get("docType"))!=null?u.toLowerCase():void 0:void 0)==="konnector"?(r=e.get("isImporting"),a=e.get("slug"),s=e.get("lastImport"),n=moment(s).format(t("date format")),o=$(".konnector-"+a+" .last-import"),r?o.html(t("importing...")):s!=null?o.html(n):o.html(t("no import performed"))):Backbone.Mediator.pub("folders:update",new i(e.attributes))},n.prototype.onRemoteCreate=function(e){return Backbone.Mediator.pub("folders:create",e)},n.prototype.onRemoteDelete=function(e){return Backbone.Mediator.pub("folders:delete",e)},n}(CozySocketListener)}),require.register("router",function(e,t,n){var r,i=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},s={}.hasOwnProperty;n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return i(t,e),t.prototype.routes={"":"main","konnector/:slug":"konnector"},t.prototype.initialize=function(e){return t.__super__.initialize.call(this),this.appView=e.appView},t.prototype.main=function(){return this.appView.showDefault()},t.prototype.konnector=function(e){return this.appView.showKonnector(e)},t}(Backbone.Router)}),require.register("views/app_view",function(e,t,n){var r,i,s,o,u,a=function(e,t){function r(){this.constructor=e}for(var n in t)f.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},f={}.hasOwnProperty;i=t("../lib/base_view"),s=t("./konnector"),o=t("./menu"),u=t("../lib/request"),n.exports=r=function(e){function n(e){n.__super__.constructor.call(this,e),this.folders=e.folders}return a(n,e),n.prototype.el="body",n.prototype.template=t("./templates/home"),n.prototype.defaultTemplate=t("./templates/default"),n.prototype.events={"click #menu-toggler":"toggleMenu"},n.prototype.subscriptions={"folders:create":"onFolderRemoteCreate","folders:update":"onFolderRemoteUpdate","folders:delete":"onFolderRemoteDelete"},n.prototype.afterRender=function(){return this.container=this.$(".container"),this.menuView=new o({collection:this.collection}),this.menuView.render()},n.prototype.showDefault=function(){return this.menuView.unselectAll(),this.container.html(this.defaultTemplate()),this.hideMenu()},n.prototype.toggleMenu=function(){return this.$("#menu").toggleClass("active")},n.prototype.hideMenu=function(){return this.$("#menu").removeClass("active")},n.prototype.showKonnector=function(e){var t,n,r;return n=this.collection.findWhere({slug:e}),n!=null?(this.cleanCurrentView(),r=this.folders.getAllPaths(),this.konnectorView=new s({model:n,paths:r}),t=this.konnectorView.render().$el,this.$(".container").append(t),this.menuView.unselectAll(),this.menuView.selectItem(n.cid),this.hideMenu()):window.router.navigate("",!0)},n.prototype.cleanCurrentView=function(){var e;this.konnectorView!=null&&this.konnectorView.destroy(),e=this.container.find("#default");if(e.length>0)return this.$("#menu-toggler").remove(),e.remove()},n.prototype.onFolderRemoteCreate=function(e){return this.folders.add(e),this.konnectorView.paths=this.folders.getAllPaths(),this.konnectorView.render()},n.prototype.onFolderRemoteUpdate=function(e){if(e!=null)return this.folders.add(e,{merge:!0}),this.konnectorView.paths=this.folders.getAllPaths(),this.konnectorView.render()},n.prototype.onFolderRemoteDelete=function(e){return this.folders.remove(e),this.konnectorView.paths=this.folders.getAllPaths(),this.konnectorView.render()},n}(i)}),require.register("views/konnector",function(e,n,r){var i,s,o,u=function(e,t){return function(){return e.apply(t,arguments)}},a=function(e,t){function r(){this.constructor=e}for(var n in t)f.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},f={}.hasOwnProperty;i=n("../lib/base_view"),o=n("../lib/request"),r.exports=s=function(e){function r(){return this.afterRender=u(this.afterRender,this),r.__super__.constructor.apply(this,arguments)}return a(r,e),r.prototype.template=n("./templates/konnector"),r.prototype.className="konnector",r.prototype.events={"click #import-button":"onImportClicked","click #delete-button":"onDeleteClicked"},r.prototype.initialize=function(e){return r.__super__.initialize.call(this,e),this.paths=e.paths||[],this.listenTo(this.model,"change",this.render)},r.prototype.afterRender=function(){var e,t,n,r,i;n=this.model.get("slug"),i=this.model.get("fieldValues"),this.$el.addClass("konnector-"+n),this.updateImportWidget(),(this.model.get("errorMessage")==null||this.model.get("isImporting"))&&this.hideErrors(),t=this.model.get("fields");for(e in t)r=t[e],i==null&&(i={}),i[e]==null&&(i[e]=""),this.addFieldWidget(n,e,r,i),r==="folder"&&this.configureFolderInput(n,e);return this.addIntervalWidget(n)},r.prototype.updateImportWidget=function(){var e,n,r;return n=this.model.get("isImporting"),r=this.model.get("lastImport"),n?(this.$(".last-import").html(t("importing...")),this.disableImportButton()):r!=null?(e=moment(r).format(t("date format")),this.$(".last-import").html(e),this.enableImportButton()):(this.$(".last-import").html(t("no import performed")),this.enableImportButton())},r.prototype.enableImportButton=function(){return this.$("#import-button").attr("aria-busy",!1),this.$("#import-button").attr("aria-disabled",!1)},r.prototype.disableImportButton=function(){return this.$("#import-button").attr("aria-busy",!0),this.$("#import-button").attr("aria-disabled",!0)},r.prototype.showErrors=function(e){return this.$(".error .message").html(e),this.$(".error").show()},r.prototype.hideErrors=function(){return this.$(".error").hide()},r.prototype.onImportClicked=function(){var e,n,r,i,s,o,u,a;if(!this.model.get("isImporting")){u=this.model.get("slug"),r=$("#"+u+"-import-date").val(),this.hideErrors(),n={date:r},o=this.model.get("fields");for(s in o)a=o[s],a==="folder"?n[s]=this.getFolderPath(u,s):n[s]=$("#"+u+"-"+s+"-input").val();return i=$("#"+u+"-autoimport-input").val(),this.disableImportButton(),e={fieldValues:n,importInterval:i},this.model.save(e,{success:function(e,t){},error:function(e){return function(n,r){if(r.status>=400&&r.status!==504)try{return e.showErrors(t(JSON.parse(r.responseText).message))}catch(i){return e.showErrors(t("import server error"))}}}(this)})}return alert(t("import already running"))},r.prototype.getFolderPath=function(e,t){var n,r,i;return n=$("#"+e+"-"+t+"-input").val(),i="",r=_.findWhere(this.paths,{id:n}),r!=null&&(i=r.path),i},r.prototype.configureFolderInput=function(e,t){var n;return n=this.$("#"+e+"-"+t+"-input"),n.change(function(){var e,t,r;return t=n.val(),e=n.parent().parent().find(".folder-link"),r="/#apps/files/folders/"+t,e.attr("href",r)})},r.prototype.addFieldWidget=function(e,n,r,i){var s,o,u,a,f,l,c;s='<div class="field line">\n<div><label for="'+e+"-"+n+'-input">'+t(n)+"</label></div>";if(r==="folder"){s+='<div><select id="'+e+"-"+n+'-input" class="folder"">',c={path:"",id:""},f=i[n]||this.paths[0].path,l=this.paths;for(o=0,u=l.length;o<u;o++)a=l[o],a.path===f?(s+='<option selected value="'+a.id+'">'+a.path+"</option>",c=a):s+='<option value="'+a.id+'">'+a.path+"</option>";s+="</select></div>",s+='<a href="/#apps/files/folders/'+c.id+'"\nclass="folder-link"\ntarget="_blank">\nopen selected folder\n</a>',s+="</div>"}else s+='<div><input id="'+e+"-"+n+'-input" type="'+r+'"\n        value="'+i[n]+'"/></div>\n</div>';return this.$(".fields").append(s)},r.prototype.addIntervalWidget=function(e){var n,r,i,s,o,u,a,f,l;u=this.model.get("lastAutoImport"),i={none:t("none"),hour:t("every hour"),day:t("every day"),week:t("every week"),month:t("each month")},r=this.model.get("importInterval"),n='<div class="field line">\n<div><label for="'+e+'-autoimport-input">'+t("auto import")+'</label></div>\n<div><select id="'+e+'-autoimport-input" class="autoimport">';for(o in i)l=i[o],a=r===o?"selected":"",n+='<option value="'+o+'" '+a+">"+l+"</option>";return n+='</select>\n<span id="'+e+'-first-import">\n<span id="'+e+'-first-import-text">\n<a id="'+e+'-first-import-link" href="#">Select a starting date</a></span>\n<span id="'+e+'-first-import-date"><span>From</span>\n<input id="'+e+'-import-date" class="autoimport" maxlength="8" type="text">\n</input>\n</span></span>\n</div>\n</div>',this.$(".fields").append(n),this.autoImportInput=this.$("#"+e+"-autoimport-input"),this.firstImport=this.$("#"+e+"-first-import"),this.firstImportDate=this.$("#"+e+"-first-import-date"),this.importDate=this.$("#"+e+"-import-date"),this.firstImportText=this.$("#"+e+"-first-import-text"),this.firstImportLink=this.$("#"+e+"-first-import-link"),r=this.autoImportInput.val(),this.firstImportDate.hide(),this.importDate.datepicker({minDate:1,dateFormat:"dd-mm-yy"}),r!=="none"&&r!=="hour"?(s=moment(u).valueOf()>moment().valueOf(),u!=null&&s?(f=moment(u).format("DD-MM-YYYY"),this.firstImportDate.show(),this.firstImportText.hide(),this.importDate.val(f)):this.firstImport.show()):this.firstImport.hide(),this.firstImportLink.click(function(e){return function(t){return t.preventDefault(),e.firstImportDate.show(),e.firstImportText.hide()}}(this)),this.autoImportInput.change(function(e){return function(){return r=e.autoImportInput.val(),r!=="none"&&r!=="hour"?e.firstImport.show():e.firstImport.hide()}}(this))},r.prototype.onDeleteClicked=function(){return o.del("konnectors/"+this.model.id,function(e){return function(n){return n?alert(t("konnector deletion error")):(alert(t("konnector deleted")),e.model.set("lastAutoImport",null),e.model.set("fieldValues",{}),e.model.set("password","{}"),window.router.navigate("",{trigger:!0}))}}(this))},r}(i)}),require.register("views/menu",function(e,t,n){var r,i,s,o=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u={}.hasOwnProperty;s=t("../lib/view_collection"),i=t("./menu_item"),n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.collectionEl="#konnectors",t.prototype.itemview=i,t.prototype.initialize=function(e){return t.__super__.initialize.call(this,e),this.listenTo(this.collection,"change",this.collection.sort.bind(this.collection)),this.listenTo(this.collection,"change",this.render)},t.prototype.afterRender=function(){return t.__super__.afterRender.call(this),this.selectItem(this.selectedCid)},t.prototype.selectItem=function(e){var t;this.selectedCid=e,t=this.views[e];if(t!=null)return t.select()},t.prototype.unselectAll=function(){var e,t,n,r;t=this.views,n=[];for(e in t)r=t[e],n.push(r.unselect());return n},t}(s)}),require.register("views/menu_item",function(e,n,r){var i,s,o=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u={}.hasOwnProperty;i=n("../lib/base_view"),r.exports=s=function(e){function r(){return r.__super__.constructor.apply(this,arguments)}return o(r,e),r.prototype.tagName="li",r.prototype.template=n("./templates/menu_item"),r.prototype.initialize=function(e){return r.__super__.initialize.call(this,e),this.listenTo(this.model,"change",this.render)},r.prototype.getRenderData=function(){var e,n;return n=this.model.get("lastImport"),this.model.isConfigured()&&n!=null?(e=moment(n).format(t("date format")),n=t("last import:")+"  "+e):this.model.isConfigured()?n=t("no import performed"):n="",_.extend({},r.__super__.getRenderData.call(this),{lastImport:n})},r.prototype.afterRender=function(){return this.model.isConfigured()&&this.$el.addClass("configured"),this.$el.addClass(this.model.get("slug"))},r.prototype.select=function(){return this.$el.addClass("selected")},r.prototype.unselect=function(){return this.$el.removeClass("selected")},r}(i)}),require.register("views/templates/default",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<div id="menu-toggler"><div class="fa fa-bars"></div></div><div id="default" class="default"><header></header><p>');var __val__=t("home headline");buf.push(escape(null==__val__?"":__val__)),buf.push("</p><ul><li>");var __val__=t("home config step 1");buf.push(escape(null==__val__?"":__val__)),buf.push("</li><li>");var __val__=t("home config step 2");buf.push(escape(null==__val__?"":__val__)),buf.push("</li><li>");var __val__=t("home config step 3");buf.push(escape(null==__val__?"":__val__)),buf.push("</li></ul>"+escape((interp=t("home more info"))==null?"":interp)+"<ul><li>");var __val__=t("home help step 1");buf.push(escape(null==__val__?"":__val__)),buf.push("</li></ul></div>")}return buf.join("")}}),require.register("views/templates/home",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<div id="menu" class="menu"><ul id="konnectors"></ul></div><div class="container"></div>')}return buf.join("")}}),require.register("views/templates/konnector",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push('<!-- .konnector --><h2 class="name"><div id="menu-toggler"><div class="fa fa-bars"></div></div><span class="service-icon"></span><span>'+escape((interp=model.name)==null?"":interp)+'</span></h2><div class="description">');var __val__=t(model.description);buf.push(null==__val__?"":__val__),buf.push('</div><div class="fields"></div><div class="buttons"><button id="import-button">'+escape((interp=t("save and import"))==null?"":interp)+"</button></div>");if(model.errorMessage){buf.push('<div class="error"><span class="error">');var __val__=t("error occurred during import:")+" ";buf.push(escape(null==__val__?"":__val__)),buf.push('<span class="message">');var __val__=t(model.errorMessage);buf.push(escape(null==__val__?"":__val__)),buf.push("</span></span></div>")}buf.push('<div class="status">'+escape((interp=status)==null?"":interp)+'</div><div class="infos"><div class="date"><span class="label">'+escape((interp=t("last import:"))==null?"":interp)+'&nbsp;</span><span class="last-import"></span></div><div class="datas">'+escape((interp=t("imported data:"))==null?"":interp)+"&nbsp;"),function(){if("number"==typeof model.modelNames.length)for(var e=0,t=model.modelNames.length;e<t;e++){var n=model.modelNames[e];buf.push("<a"),buf.push(attrs({href:"/apps/databrowser/#search/all/"+n+"",target:"_blank"},{href:!0,target:!0})),buf.push(">"+escape((interp=n)==null?"":interp)+"&nbsp;</a>")}else{var t=0;for(var e in model.modelNames){t++;var n=model.modelNames[e];buf.push("<a"),buf.push(attrs({href:"/apps/databrowser/#search/all/"+n+"",target:"_blank"},{href:!0,target:!0})),buf.push(">"+escape((interp=n)==null?"":interp)+"&nbsp;</a>")}}}.call(this),buf.push('</div></div><div class="danger-zone"><h3>');var __val__=t("konnector danger zone");buf.push(escape(null==__val__?"":__val__)),buf.push('</h3><button id="delete-button">');var __val__=t("konnector delete credentials");buf.push(escape(null==__val__?"":__val__)),buf.push("</button></div>")}return buf.join("")}}),require.register("views/templates/menu_item",function(exports,require,module){module.exports=function anonymous(locals,attrs,escape,rethrow,merge){attrs=attrs||jade.attrs,escape=escape||jade.escape,rethrow=rethrow||jade.rethrow,merge=merge||jade.merge;var buf=[];with(locals||{}){var interp;buf.push("<a"),buf.push(attrs({href:"#konnector/"+model.slug+""},{href:!0})),buf.push('><span class="service-icon"></span><div><span class="name">');var __val__=model.name;buf.push(escape(null==__val__?"":__val__)),buf.push("</span>");if(lastImport!=null&&lastImport.length>0){buf.push('<span class="last-import">');var __val__=lastImport;buf.push(escape(null==__val__?"":__val__)),buf.push("</span>")}model.isImporting===!0?buf.push('<div class="spinholder"><img src="images/spinner.svg"/></div>'):model.errorMessage!=null&&(buf.push("<i"),buf.push(attrs({title:t("error occurred during import."),"class":"fa fa-warning"},{title:!0})),buf.push("></i>")),buf.push("</div></a>")}return buf.join("")}})