import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import logging

from collections import OrderedDict
from ckan.logic import side_effect_free
from ckan.plugins.toolkit import chained_action

logger = logging.getLogger(__name__)

class ThemeDesignSystemFrPlugin(plugins.SingletonPlugin):
    #plugins.implements(plugins.IActions)
    plugins.implements(plugins.IBlueprint)
    plugins.implements(plugins.IConfigurer)
    # not what I thought: it's facetting datasets when in org page
    #plugins.implements(plugins.IFacets)

    def update_config(self, config):
        toolkit.add_template_directory(config, 'templates')
        toolkit.add_public_directory(config, 'public')
        toolkit.add_resource('assets', 'design_system')  #FIXME: name?
        toolkit.add_resource('fanstatic', 'test')  #FIXME: name?

    def get_blueprint(self):
        logger.debug('BLUEPRINT')
        from flask import Blueprint
        from ckan.views.group import register_group_plugin_rules

        organization = Blueprint(u'organization2', __name__,
            url_prefix=u'/organization',
            url_defaults={u'group_type': u'organization', u'is_organization': True})

        # can't override rule, must create new Blueprint and register it over the previous one
        organization.add_url_rule(u'/', view_func=_index, strict_slashes=False)
        register_group_plugin_rules(organization)

        return organization

    #FIXME: requires IActions
    def get_actions(self):
        return {
            'organization_list': _organization_list
            #'organization_search': _organization_search
        }


#FIXME: can we add a facet type to IFacets?
_FACETS = OrderedDict({
    'types': toolkit._('Types'),
    'territoire_de_competence': toolkit._('Territoire de compétence')
})


# works but can't override extra_vars for templating, and can't find a way to do it...
@side_effect_free
@chained_action
def _organization_list(original_action, context, data_dict=None):
    facets = OrderedDict()
    data_dict[u'facet.field'] = list(_FACETS.keys())

    logger.info(f'data_dict={data_dict}')
    return original_action(context, data_dict)

@side_effect_free
def _organization_search():
    pass


import ckan.lib.base as base
import ckan.lib.helpers as h
import ckan.model as model
from ckan.common import g, config, request
from ckan.views.group import set_org, _action, _check_access, _get_group_template
def _index(group_type, is_organization):
    extra_vars = {}
    set_org(is_organization)
    page = h.get_page_number(request.params) or 1
    items_per_page = int(config.get(u'ckan.datasets_per_page', 20))

    context = {
        u'model': model,
        u'session': model.Session,
        u'user': g.user,
        u'for_view': True,
        u'with_private': False
    }

    try:
        _check_access(u'site_read', context)
        _check_access(u'group_list', context)
    except NotAuthorized:
        base.abort(403, _(u'Not authorized to see this page'))

    q = request.params.get(u'q', u'')
    sort_by = request.params.get(u'sort')

    # TODO: Remove
    # ckan 2.9: Adding variables that were removed from c object for
    # compatibility with templates in existing extensions
    g.q = q
    g.sort_by_selected = sort_by

    extra_vars["q"] = q
    extra_vars["sort_by_selected"] = sort_by

    # pass user info to context as needed to view private datasets of
    # orgs correctly
    if g.userobj:
        context['user_id'] = g.userobj.id
        context['user_is_admin'] = g.userobj.sysadmin

    extra_vars[u'facet_titles'] = _FACETS
    logger.debug(f'FACETS={_FACETS}')

    try:
        data_dict_global_results = {
            u'all_fields': False,
            u'q': q,
            u'sort': sort_by,
            u'type': group_type or u'group',
            u'facet.field': list(_FACETS.keys())
        }
        # TODO: group_search
        global_results = _action(u'group_list')(context,
                                                data_dict_global_results)
    except ValidationError as e:
        if e.error_dict and e.error_dict.get(u'message'):
            msg = e.error_dict['message']
        else:
            msg = str(e)
        h.flash_error(msg)
        extra_vars["page"] = h.Page([], 0)
        extra_vars["group_type"] = group_type
        return base.render(
            _get_group_template(u'index_template', group_type), extra_vars)

    data_dict_page_results = {
        u'all_fields': True,
        u'q': q,
        u'sort': sort_by,
        u'type': group_type or u'group',
        u'limit': items_per_page,
        u'offset': items_per_page * (page - 1),
        u'include_extras': True
    }
    page_results = _action(u'group_list')(context, data_dict_page_results)

    extra_vars["page"] = h.Page(
        collection=global_results,
        page=page,
        url=h.pager_url,
        items_per_page=items_per_page, )

    extra_vars["page"].items = page_results
    extra_vars["group_type"] = group_type

    # TODO: Remove
    # ckan 2.9: Adding variables that were removed from c object for
    # compatibility with templates in existing extensions
    g.page = extra_vars["page"]
    return base.render(
        _get_group_template(u'index_template', group_type), extra_vars)
